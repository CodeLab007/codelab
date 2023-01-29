import { Dialect, Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path:path.resolve(__dirname,'../','../.env')});
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

 