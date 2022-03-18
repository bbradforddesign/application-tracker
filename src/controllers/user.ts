import { UserFields } from "../models/user";
import { createUser, getUser } from "../services/user";

export const registerUser = (fields: UserFields) => {
    // TODO: create user in auth0 tenant; pass authID to following service
    // store user in db
    try {
        return createUser(fields);
    } catch (error) {
        throw error;
    }
};

export const getUserById = (userId: number) => {
    try {
        return getUser(userId);
    } catch (err) {
        throw err;
    }
};
