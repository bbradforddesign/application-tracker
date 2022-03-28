import { User, UserFields } from "../interfaces/user";
import Model from "../interfaces/model";
import pool from "../db";
import type { Pool, QueryResult } from "pg";

class UserModel implements Model<Pool, UserFields, User> {
    pool: Pool;
    constructor(pool: Pool) {
        this.pool = pool;
    }

    async create(fields: UserFields): Promise<QueryResult<User>> {
        return await this.pool.query({
            text: `
                INSERT INTO user_account (
                    first_name, 
                    last_name,
                    auth_id
                ) VALUES (
                    $1, 
                    $2,
                    $3
                ) RETURNING *;
            `,
            values: [fields.first_name, fields.last_name, fields.auth_id],
        });
    }

    async get(id: string): Promise<QueryResult<User>> {
        return await this.pool.query({
            text: `
                SELECT * FROM user_account
                WHERE id = ($1)
            `,
            values: [id],
        });
    }

    async getByAuth(authId: string): Promise<QueryResult<User>> {
        return await this.pool.query({
            text: `
                SELECT * FROM user_account
                WHERE auth_id = ($1) 
            `,
            values: [authId],
        });
    }

    async update(user: User): Promise<QueryResult<User>> {
        return await this.pool.query({
            text: `
                INSERT INTO user_account (
                    first_name,
                    last_name,
                    auth_id
                ) VALUES (
                    $1, 
                    $2,
                    $3
                ) ON CONFLICT (
                    auth_id
                ) DO UPDATE
                    SET 
                    first_name = $1,
                    last_name = $2
                RETURNING first_name, last_name;
            `,
            values: [user.first_name, user.last_name, user.auth_id],
        });
    }

    async delete(id: string): Promise<QueryResult<User>> {
        return await this.pool.query({
            text: `
               DELETE FROM user_account
               WHERE id = ($1); 
            `,
            values: [id],
        });
    }
}

export default new UserModel(pool);
