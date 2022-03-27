import { ErrorRequestHandler } from "express";

// centralized error handler for ease and consistency
const errorHandler: ErrorRequestHandler = (err: any, req, res, next) => {
    console.log(err);

    if (err.name === "UnauthorizedError") {
        return res.status(err.status).send("unauthorized");
    } else if (err.statusCode) {
        return res.status(err.statusCode).send(err.message);
    } else {
        return res.status(500).send("server error");
    }
};

export default errorHandler;
