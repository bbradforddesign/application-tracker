import { User } from "../interfaces/user";
import UserModel from "../models/user";
import { ApiError } from "../classes/apiError";

const UserController = {
    async getUser(id: string): Promise<User> {
        try {
            // if no rows found, create new blank profile
            let res = await UserModel.get(id);

            if (!res || res.rows.length === 0) {
                res = await UserModel.create({
                    id: id,
                });

                if (!res || res.rows.length === 0) {
                    throw new ApiError(500, "failed to retrieve user");
                }
            }

            return res.rows[0];
        } catch (err) {
            throw err;
        }
    },
    async updateUser(user: User): Promise<User> {
        try {
            // upsert user profile with supplied fields
            const res = await UserModel.update(user);

            if (!res || res.rows.length === 0) {
                throw new ApiError(500, "failed to update user");
            }

            return res.rows[0];
        } catch (err) {
            throw err;
        }
    },
};

export default UserController;
