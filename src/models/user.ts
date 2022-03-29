import { User, UserFields } from "../interfaces/user";
import Model from "../interfaces/model";
import pool from "../db";
import type { Pool, QueryResult } from "pg";

class UserModel implements Model<Pool, UserFields, User> {
    pool: Pool;
    constructor(pool: Pool) {
        this.pool = pool;
    }

    async create(fields: User): Promise<QueryResult<User>> {
        return await this.pool.query({
            text: `
                INSERT INTO user_account (
                    first_name, 
                    last_name,
                    id
                ) VALUES (
                    $1, 
                    $2,
                    $3
                ) RETURNING *;
            `,
            values: [fields.first_name, fields.last_name, fields.id],
        });
    }

    async get(userId: string): Promise<QueryResult<User>> {
        return await this.pool.query({
            text: `
                SELECT first_name, last_name FROM user_account
                WHERE id = ($1) 
            `,
            values: [userId],
        });
    }

    async update(user: User): Promise<QueryResult<User>> {
        return await this.pool.query({
            text: `
                INSERT INTO user_account (
                    first_name,
                    last_name,
                    id
                ) VALUES (
                    $1, 
                    $2,
                    $3
                ) ON CONFLICT (
                    id 
                ) DO UPDATE
                    SET 
                    first_name = COALESCE($1, user_account.first_name),
                    last_name = COALESCE($2, user_account.last_name)
                RETURNING first_name, last_name;
            `,
            values: [user.first_name, user.last_name, user.id],
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
