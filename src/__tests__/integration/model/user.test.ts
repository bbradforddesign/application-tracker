import pool from "../../../db";
import { UserFields } from "../../../interfaces/user";
import UserModel from "../../../models/user";

describe("User model", () => {
    // mock user table
    beforeAll(async () => {
        try {
            return await pool.query(`
                CREATE TEMPORARY TABLE user_account (LIKE user_account INCLUDING ALL)
            `);
        } catch (err) {
            console.log(err);
        }
    });

    // drop mocked user table
    afterAll(async () => {
        try {
            return await pool.query(`
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
                auth_id: "123",
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
            first_name: "Bob",
            last_name: "Smith",
            auth_id: "123",
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

    test("updates a user in the users table", async () => {
        try {
            const createRes = await UserModel.create({
                first_name: "Bob",
                last_name: "Smith",
                auth_id: "123",
            });
            const newUser = createRes.rows[0];

            newUser.first_name = "John";
            newUser.last_name = "Doe";

            const updateRes = await UserModel.update(newUser);
            const user = updateRes.rows[0];

            expect(user.first_name).toEqual("John");
            expect(user.last_name).toEqual("Doe");
        } catch (err) {
            console.log(err);
        }
    });

    test("deletes a user in the users table", async () => {
        try {
            const createRes = await UserModel.create({
                first_name: "Bob",
                last_name: "Smith",
                auth_id: "123",
            });
            const newUser = createRes.rows[0];

            await UserModel.delete(newUser.id);

            const verifyRes = await UserModel.get(newUser.id);

            expect(verifyRes).toBeNull;
        } catch (err) {
            console.log(err);
        }
    });
});
