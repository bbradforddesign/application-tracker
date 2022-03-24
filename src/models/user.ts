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

    async update(user: User): Promise<QueryResult<User>> {
        return await this.pool.query({
            text: `
                UPDATE user_account 
                SET first_name = ($1), last_name = ($2) 
                WHERE id = ($3);
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
