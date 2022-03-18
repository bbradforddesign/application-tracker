import { User, UserFields } from "../models/user";
import pool from "../db";

export const getUser = (id: number): Promise<User> => {
    return pool
        .connect()
        .then((client) => {
            return client
                .query({
                    text: `SELECT * FROM "User".users WHERE id = $1`,
                    values: [id],
                })
                .then((res) => {
                    client.release();
                    const user: User = res.rows[0];
                    return user;
                })
                .catch((err) => {
                    client.release();
                    throw err;
                });
        })
        .catch((err) => {
            throw err;
        });
};

export const createUser = (fields: UserFields): Promise<User> => {
    return pool
        .connect()
        .then((client) => {
            return client
                .query({
                    text: `
                INSERT INTO "User".users(
                    first_name, 
                    last_name
                ) VALUES (
                    $1, 
                    $2
                ) RETURNING *;`,
                    values: [fields.first_name, fields.last_name],
                })
                .then((res) => {
                    client.release();
                    const newUser: User = res.rows[0];
                    return newUser;
                })
                .catch((err) => {
                    client.release();
                    throw err;
                });
        })
        .catch((err) => {
            throw err;
        });
};
