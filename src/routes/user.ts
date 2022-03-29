import express from "express";
import { ApiError } from "../classes/apiError";

import UserController from "../controllers/user";
import { UserFields } from "../interfaces/user";

const userRouter = express.Router();

userRouter.put("/profile", async (req, res, next) => {
    if (!req.user) {
        return next(new ApiError(401, "unauthorized"));
    }

    const fields: UserFields = req.body;

    try {
        const updatedProfile = await UserController.updateUser({
            id: req.user.sub,
            first_name: fields.first_name,
            last_name: fields.last_name,
        });

        return res.status(200).json(updatedProfile);
    } catch (err) {
        return next(err);
    }
});

userRouter.get("/profile", async (req, res, next) => {
    if (!req.user) {
        return next(new ApiError(401, "unauthorized"));
    }

    try {
        const user = await UserController.getUser(req.user.sub);

        return res.status(200).json(user);
    } catch (err) {
        return next(err);
    }
});

export default userRouter;
