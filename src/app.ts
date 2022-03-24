import express from "express";
import { auth } from "express-oauth2-jwt-bearer";

import indexRouter from "./routes/index";
import userRouter from "./routes/user";

const app = express();

// middleware
app.use(express.json());

// api routers
app.use("/", indexRouter);
app.use("/user", auth(), userRouter);

export default app;
