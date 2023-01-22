import 'ts-node/register';
import { Dialect, Sequelize } from 'sequelize';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();
import { Umzug, SequelizeStorage } from 'umzug';
// const { Sequelize } =require('sequelize');

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.USERNAME as string,
  process.env.PASSWORD as string,
  {
    logging: console.log,
    host: process.env.HOSTNAME,
    dialect: process.env.DILECT as Dialect,
    port: process.env.DB_PORT as any,
  },
);

export const migrator = new Umzug({
  migrations: {
    glob: ['migrations/*.ts', { cwd: __dirname }],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
  }),
  create: {
    folder: 'migrations',
    template: (filepath: string) => [
      // read template from filesystem
      [filepath, fs.readFileSync(path.join(__dirname, 'utils/migration-template.ts')).toString()],
    ],
  },
  logger: console,
});

export type Migration = typeof migrator._types.migration;
