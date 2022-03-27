import express from "express";
import cors from "cors";

import indexRouter from "./routes/index";
import userRouter from "./routes/user";
import validateAuth from "./services/validateAuth";

const app = express();

// middleware
app.use(express.json());
app.use(
    cors({
        origin: process.env.CLIENT_ORIGIN,
    })
);

// api routers
app.use("/", indexRouter);
app.use("/user", validateAuth, userRouter);

export default app;
