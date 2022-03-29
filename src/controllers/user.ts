import express from "express";
import { ApiError } from "../classes/apiError";

import UserModel from "../models/user";
import { UserFields } from "../interfaces/user";

const userController = express.Router();

userController.post("/", async (req, res, next) => {
    if (!req.user) {
        return next(new ApiError(401, "unauthorized"));
    }

    const fields: UserFields = req.body;

    try {
        const query = await UserModel.create({
            id: req.user.sub,
            first_name: fields.first_name,
            last_name: fields.last_name,
        });

        if (!query || query.rows.length === 0) {
            throw new ApiError(500, "failed to create user");
        }

        return res.status(200).json(query.rows[0]);
    } catch (err) {
        return next(err);
    }
});

userController.put("/", async (req, res, next) => {
    if (!req.user) {
        return next(new ApiError(401, "unauthorized"));
    }

    const fields: UserFields = req.body;

    try {
        const query = await UserModel.update({
            id: req.user.sub,
            first_name: fields.first_name,
            last_name: fields.last_name,
        });

        if (!query || query.rows.length === 0) {
            throw new ApiError(500, "failed to update user");
        }

        return res.status(200).json(query.rows[0]);
    } catch (err) {
        return next(err);
    }
});

userController.get("/", async (req, res, next) => {
    if (!req.user) {
        return next(new ApiError(401, "unauthorized"));
    }

    try {
        const query = await UserModel.get(req.user.sub);

        if (!query || query.rows.length === 0) {
            return next();
        }

        return res.status(200).json(query.rows[0]);
    } catch (err) {
        return next(err);
    }
});

export default userController;
