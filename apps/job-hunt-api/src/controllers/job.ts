import { Job } from '../models/Job';
import { Request, Response, NextFunction } from 'express';
import { UserType, AuthType } from '../types/model-types';
import { BadRequestError } from '@codelab/api-errors';
import { getValidUpdates } from '../utils/validate-updates';
import { getPaginated } from '../utils/paginate';
import { Op } from 'sequelize';
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

    if (req.user.type === UserType.USER) {
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

    if (req.user.type === UserType.USER) {
      const err = new BadRequestError('wrong user request');
      res.status(403).send(err);
    }

    // const company = req.user.Company;

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

    if (req.user.type === UserType.USER) {
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

    if (req.user.type === UserType.USER) {
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
  salaryRange?: { min: number; max: number };
  projectLength?: string;
  location?: string;
}
export const List = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user.type === UserType.COMPANY) {
      const err = new BadRequestError('wrong user request');
      res.status(403).send(err);
    }

    // const company = req.user.Company;
    const { limit, offset } = getPaginated(req.query);
    // filters

    const { filters, search } = getFiltersAndSearchQuery(
      req.query.filters as Filters,
      req.query.search as string,
    );
    // sortBy
    const sortBy = req.query.sortBy;

    const { count: total, rows: jobs } = await Job.findAndCountAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: filters,
          },
          {
            title: search,
          },
        ],
      },
      offset: offset,
      limit: limit,
      order: [[sortBy as string, 'DESC']],
    });

    res.status(201).send({ message: 'Success', data: jobs, total });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getFiltersAndSearchQuery = (filterObject: Filters, searchValue: string) => {
  let filters = [];
  for (const filter in filterObject) {
    if (filter === 'salaryRange') {
      filters.push({
        salary: {
          [Op.between]: [filterObject[filter]?.min, filterObject[filter]?.max],
        },
      });
    } else {
      filters.push({
        [filter]: {
          [Op.eq]: filterObject[filter as keyof Filters],
        },
      });
    }
  }

  const search = {
    [Op.like]: `%${searchValue}%`,
  };

  return { filters, search };
};
