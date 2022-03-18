import express, { Request, Response } from "express";
import { getUserById, registerUser } from "../controllers/user";
import { UserFields } from "../models/user";

const userRouter = express.Router();

// confirms router is correctly configured
userRouter.post("/", (req: Request, res: Response) => {
    const userFields: UserFields = req.body;

    // validation
    if (!userFields.first_name || !userFields.last_name) {
        res.statusMessage = "required fields must be provided";
        res.status(400).end();
        return;
    }

    registerUser(userFields)
        .then((newUser) => {
            res.status(200).json(newUser);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).end();
        });
});

userRouter.get("/:id", (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);

    if (!userId) {
        res.status(404).end();
        return;
    }

    getUserById(userId)
        .then((user) => {
            if (!user) {
                res.status(404).end();
            }
            res.status(200).json(user);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).end();
        });
});

export default userRouter;
