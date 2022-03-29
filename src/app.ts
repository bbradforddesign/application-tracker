import express from "express";
import cors from "cors";

import userController from "./controllers/user";
import validateAuth from "./services/validateAuth";
import errorHandler from "./middleware/errorHandler";

const app = express();

// middleware
app.use(express.json());
app.use(
    cors({
        origin: process.env.CLIENT_ORIGIN,
    })
);

// api routers
app.use("/user", validateAuth, userController);

// error handling
app.use(errorHandler);
app.use((req, res, next) => {
    return res.status(404).send("not found");
});

export default app;
