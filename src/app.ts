import express from "express";
import indexRouter from "./routes/index";
import userRouter from "./routes/user";

const app = express();

// middleware
app.use(express.json());

// api routers
app.use("/", indexRouter);
app.use("/user", userRouter);

export default app;
