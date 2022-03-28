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
            auth_id: req.user.sub,
            first_name: fields.first_name,
            last_name: fields.last_name,
        });

        if (!updatedProfile) {
            throw new ApiError(500, "failed to update user");
        }

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
        // retrieve user from db
        let user = await UserController.getUserByAuth(req.user.sub);
        if (!user) {
            // if no match, create new profile from ID token
            user = await UserController.registerUser({
                auth_id: req.user.sub,
            });
            if (!user) {
                throw new ApiError(500, "failed to register user");
            }
        }

        return res.status(200).json(user);
    } catch (err) {
        return next(err);
    }
});

export default userRouter;
