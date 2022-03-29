import { User } from "../interfaces/user";
import UserModel from "../models/user";

const UserController = {
    // registers user within postgres if already within Auth0
    async registerUser(fields: User): Promise<User> {
        try {
            const res = await UserModel.create(fields);
            return res.rows[0];
        } catch (err) {
            throw err;
        }
    },
    async getUser(id: string): Promise<User> {
        try {
            const res = await UserModel.get(id);
            return res.rows[0];
        } catch (err) {
            throw err;
        }
    },
    async updateUser(user: User): Promise<User> {
        try {
            const res = await UserModel.update(user);
            return res.rows[0];
        } catch (err) {
            throw err;
        }
    },
};

export default UserController;
