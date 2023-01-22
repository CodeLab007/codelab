import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from 'dotenv';
import { errorHandler } from "./middlewares/error-middleware";

import {sequelize} from './umguz'
import logger from "morgan"
const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.DOMAIN,
    credentials: true,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dotenv.config();

// ASSOCIATIONS
// import "./utils/associations"


//All routes here.

// app.use("/media", express.static(path.join(__dirname, "media")));

// const userRouter = require("./routes/UserRoutes");
// app.use("/user", userRouter);
app.use(errorHandler);

app.get("/test", (req, res) => {
  // res.send({ origin: req.get("origin") });
  res.send({success:"true"});
  
});
// console.log(sequelize);

const port = process.env.PORT;
console.log('running server',process.env.PORT)
app.listen(port);
export default app;
