import { Job } from '../models/Job';
import { Request, Response, NextFunction } from 'express';
import { UserType, AuthType } from '../types/model-types';
import { BadRequestError } from '@codelab/api-errors';

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

export const List = async (req: Request, res: Response, next: NextFunction) => {
  try {
    

    if (req.user.type === UserType.USER) {
      const err = new BadRequestError('wrong user request');
      res.status(403).send(err);
    }

    const company = req.user.Company;

    const jobs = await Job.findAll({
      where: {
        CompanyId: company?.id as number,
      },
    });

    res.status(201).send({ message: 'Success', data: jobs });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
