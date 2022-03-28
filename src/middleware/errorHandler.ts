import { ErrorRequestHandler } from "express";

// centralized error handler for ease and consistency
const errorHandler: ErrorRequestHandler = (err: any, req, res, next) => {
    // don't log validation/auth errors
    if (err.status >= 500 || !err.status) {
        console.log(err);
    }

    if (err.name === "UnauthorizedError") {
        return res.status(err.status).send("unauthorized");
    } else if (err.status) {
        return res.status(err.status).send(err.message);
    } else {
        return res.status(500).send("server error");
    }
};

export default errorHandler;
