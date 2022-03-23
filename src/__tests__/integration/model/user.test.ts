import pool from "../../../db";
import { UserFields } from "../../../interfaces/user";
import UserModel from "../../../models/user";

describe("User services", () => {
    // mock user table
    beforeEach(async () => {
        try {
            await pool.query(`
                CREATE TEMPORARY TABLE user_account (LIKE user_account INCLUDING ALL)
            `);
        } catch (err) {
            console.log(err);
        }
    });

    // drop mocked user table
    afterEach(async () => {
        try {
            await pool.query(`
                DROP TABLE IF EXISTS pg_temp.user_account
            `);
        } catch (err) {
            console.log(err);
        }
    });

    test("retrieves user from the users table", async () => {
        try {
            const createRes = await UserModel.create({
                first_name: "Bob",
                last_name: "Smith",
            });
            const newUser = createRes.rows[0];

            const getRes = await UserModel.get(newUser.id);
            const user = getRes.rows[0];

            expect(user.first_name).toEqual("Bob");
            expect(user.last_name).toEqual("Smith");
        } catch (err) {
            console.log(err);
        }
    });

    test("creates a new user within the users table", async () => {
        const userFields: UserFields = {
            first_name: "John",
            last_name: "Doe",
        };

        try {
            const res = await UserModel.create(userFields);
            const newUser = res.rows[0];

            expect(newUser.first_name).toEqual(userFields.first_name);
            expect(newUser.last_name).toEqual(userFields.last_name);
            expect(newUser.id).not.toBeNull();
        } catch (err) {
            console.log(err);
        }
    });
});
