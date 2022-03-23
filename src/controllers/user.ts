import { UserFields, User } from "../interfaces/user";
import UserModel from "../models/user";

const UserController = {
    async registerUser(fields: UserFields): Promise<User> {
        try {
            // TODO: create user in auth0 tenant; pass authID to following service
            // store user in db
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
};

export default UserController;
