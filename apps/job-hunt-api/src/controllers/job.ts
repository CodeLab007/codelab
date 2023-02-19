import { Job } from '../models/Job';
import { Request, Response, NextFunction } from 'express';
import { UserType, AuthType } from '../types/model-types';
import { BadRequestError } from '@codelab/api-errors';
import { getValidUpdates } from '../utils/validate-updates';
import { getPaginated } from '../utils/paginate';
import { Op } from 'sequelize';
import { filter } from 'lodash';
import { compareSync } from 'bcrypt';
export const Create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      title,
      descriptionShort,
      descriptionLong,
      requirements,
      tags,
      category,
      expiryDate,
      salary,
      experience,
      employementType,
      projectLength,
      location,
    } = req.body;

    if (req.user && req.user.type === UserType.USER) {
      const err = new BadRequestError('wrong user request');
      res.status(403).send(err);
    }

    const company = req.user.Company;

    const job = await Job.create({
      title,
      descriptionShort,
      descriptionLong,
      requirements,
      tags,
      category,
      expiryDate,
      salary,
      experience,
      employementType,
      projectLength,
      location,
      CompanyId: company?.id as number,
    });

    res.status(201).send({ message: 'Success', data: job });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const Get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (req.user && req.user.type === UserType.USER) {
      const err = new BadRequestError('wrong user request');
      res.status(403).send(err);
    }

    const job = await Job.findOne({
      where: {
        id,
      },
    });

    res.status(201).send({ message: 'Success', data: job });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
export const Update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const validUpdates = [
      'title',
      'descriptionShort',
      'descriptionLong',
      'requirements',
      'tags',
      'category',
      'expiryDate',
      'salary',
      'experience',
      'employementType',
      'projectLength',
      'location',
    ];
    const validBody = getValidUpdates(validUpdates, body);

    if (req.user && req.user.type === UserType.USER) {
      const err = new BadRequestError('wrong user request');
      res.status(403).send(err);
    }

    const job = await Job.update(
      { ...validBody },
      {
        where: {
          id,
        },
      },
    );

    res.status(201).send({ message: 'Success', data: job });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
export const Delete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (req.user && req.user.type === UserType.USER) {
      const err = new BadRequestError('wrong user request');
      res.status(403).send(err);
    }

    // const company = req.user.Company;

    const job = await Job.destroy({
      where: {
        id,
      },
    });

    res.status(201).send({ message: 'Success', data: job });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

//job-seeker finding a job
//company is not allowed to find a job

interface Filters {
  experience?: string;
  employementType?: string;
  projectLength?: string;
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  search: string;
}
export const List = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user && req.user.type === UserType.COMPANY) {
      const err = new BadRequestError('wrong user request');
      res.status(403).send(err);
    }

    // const company = req.user.Company;
    const { limit, offset } = getPaginated(req.query);
    // filters
    const queryFilters = {
      experience: req.query.experience,
      employementType: req.query.employementType,
      projectLength: req.query.projectLength,
      location: req.query.location,
      salaryMin: req.query.salaryMin,
      salaryMax: req.query.salaryMax,
      search: req.query.search,
    };

    const { filters, search } = getFiltersAndSearchQuery(queryFilters as unknown as Filters);

    let where = {};
    if (filters.length) {
      where = {
        [Op.and]: [
          {
            [Op.or]: filters,
          },
        ],
      };
    }
    if (search) {
      where = {
        [Op.and]: [
          {
            title: search,
          },
        ],
      };
    }
    if (search && filters.length) {
      where = {
        [Op.and]: [
          {
            [Op.or]: filters,
          },
          {
            title: search,
          },
        ],
      };
    }

    // sortBy
    const sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt';
    const sortAs = req.query.sortAs ? (req.query.sortAs as string) : 'DESC';

    const { count: total, rows: jobs } = await Job.findAndCountAll({
      where,
      offset: offset,
      limit: limit,
      order: [[sortBy as string, sortAs]],
    });

    res.status(201).send({ message: 'Success', data: jobs, total });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getFiltersAndSearchQuery = (filterObject: Filters) => {
  let filters = [] as any;
  let search = null;
  const customFilters = ['search', 'salaryMin', 'salaryMax', 'page', 'limit'];

  if (filterObject['salaryMin'] && filterObject['salaryMax']) {
    filters.push({
      salary: {
        [Op.and]: {
          [Op.gte]: filterObject['salaryMin'],
          [Op.lte]: filterObject['salaryMax'],
        },
      },
    });
  }

  if (filterObject['search']) {
    search = {
      [Op.like]: `%${filterObject['search']}%`,
    };
  }

  for (const filter in filterObject) {
    if (!customFilters.includes(filter) && filterObject[filter as keyof Filters]) {
      filters.push({
        [filter]: {
          [Op.eq]: filterObject[filter as keyof Filters],
        },
      });
    }
  }
  return { filters, search };
};
