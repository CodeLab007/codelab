<<<<<<< Updated upstream
=======
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from 'dotenv';

// import {sequelize} from './umguz' 
import logger from "morgan"
import { errorHandler } from "./middlewares";


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
// app.get("/test", (req, res) => {
  // res.send({ origin: req.get("origin") });
  
// });
// console.log(sequelize);

const port = process.env.PORT;
app.listen(port);
export default app;
>>>>>>> Stashed changes
