import express, { Request, Response } from "express";
import UserController from "../controllers/user";
import { UserFields } from "../interfaces/user";

const userRouter = express.Router();

userRouter.post("/", async (req: Request, res: Response) => {
    const userFields: UserFields = req.body;

    // validate that all required fields provided
    if (!userFields.first_name || !userFields.last_name) {
        res.statusMessage = "required fields must be provided";
        res.status(400).end();
        return;
    }

    // store user in db
    try {
        const newUser = await UserController.registerUser(userFields);
        if (!newUser) {
            res.statusMessage = "failed to register user";
            res.status(500).end();
        }
        res.status(200).json(newUser);
    } catch (err) {
        console.log(err);
        res.status(500).end();
    }
});

userRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!id) {
        res.status(404).end();
        return;
    }

    // retrieve user from db
    try {
        const user = await UserController.getUser(id);
        if (!user) {
            res.status(404).end();
        }
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).end();
    }
});

export default userRouter;
