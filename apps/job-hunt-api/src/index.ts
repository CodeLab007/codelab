import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/error-middleware';
import { PLATFORM_NAME } from './utils/globals';
import logger from 'morgan';
import path from 'path';

import { sequelize } from './config/db';
// @ts-ignore
global.PLATFORM_NAME = PLATFORM_NAME;
const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.DOMAIN,
    credentials: true,
  }),
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// ASSOCIATIONS
import './utils/associations';
app.use('/media', express.static(path.join(__dirname, 'media')));
//Error Handler
app.use(errorHandler);

// Routes
import authRoutes from './routes/auth';
import jobRoutes from './routes/job';
app.use('/v1/api/auth', authRoutes);
app.use('/v1/api/job', jobRoutes);

const port = process.env.PORT;

try {
  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    app.listen(port);
    console.log('listening to port ', port);
  });
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
export default app;
