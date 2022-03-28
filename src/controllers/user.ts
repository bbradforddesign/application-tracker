import { UserFields, User } from "../interfaces/user";
import UserModel from "../models/user";

const UserController = {
    // registers user within postgres if already within Auth0
    async registerUser(fields: UserFields): Promise<User> {
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
    async getUserByAuth(authId: string): Promise<User> {
        try {
            const res = await UserModel.getByAuth(authId);
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
