import express, { Request, Response } from "express";

const indexRouter = express.Router();

// confirms router is correctly configured
indexRouter.get("/hello", (req: Request, res: Response) => {
    return res.status(200).json({
        message: "Hello",
    });
});

export default indexRouter;
