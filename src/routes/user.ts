import express from "express";
import jwtAuthz from "express-jwt-authz";
import { ApiError } from "../classes/customError";

import UserController from "../controllers/user";
import { UserFields } from "../interfaces/user";

const userRouter = express.Router();

userRouter.post("/", async (req, res, next) => {
    const userFields: UserFields = req.body;

    try {
        // validate that all required fields provided
        if (!userFields.first_name || !userFields.last_name) {
            throw new ApiError(400, "required fields must be provided");
        }

        // store user in db
        const newUser = await UserController.registerUser(userFields);
        if (!newUser) {
            throw new ApiError(500, "failed to register user");
        }

        return res.status(200).json(newUser);
    } catch (err) {
        return next(err);
    }
});

userRouter.get("/:id", async (req, res, next) => {
    const id = req.params.id;

    // extract claims from jwt
    //console.log(req.user?.sub);

    if (!id) {
        return next();
    }

    // retrieve user from db
    try {
        const user = await UserController.getUser(id);
        if (!user) {
            return next();
        }
        return res.status(200).json(user);
    } catch (err) {
        return next(err);
    }
});

export default userRouter;
