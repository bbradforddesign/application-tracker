import { UserFields, User } from "../interfaces/user";
import UserModel from "../models/user";
import managementClient from "../services/auth";

const UserController = {
    async registerUser(fields: UserFields): Promise<User> {
        try {
            const authRes = await managementClient.createUser({
                email: fields.email,
                name: `${fields.first_name} ${fields.last_name}`,
                password: fields.password,
                username: `${fields.first_name}123`,
                connection: "Username-Password-Authentication",
            });

            fields.auth_id = authRes.user_id || "";
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
