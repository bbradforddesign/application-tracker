import pool from "../../../db";
import { User } from "../../../interfaces/user";
import UserModel from "../../../models/user";

describe("User model", () => {
    // mock user table
    beforeEach(async () => {
        try {
            return await pool.query(`
                CREATE TEMPORARY TABLE user_account (LIKE user_account INCLUDING ALL)
            `);
        } catch (err) {
            console.log(err);
        }
    });

    // drop mocked user table
    afterEach(async () => {
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
            await UserModel.create({
                first_name: "Bob",
                last_name: "Smith",
                id: "123",
            });

            const getRes = await UserModel.get("123");
            const user = getRes.rows[0];

            expect(user).toEqual({
                first_name: "Bob",
                last_name: "Smith",
            });
        } catch (err) {
            console.log(err);
        }
    });

    test("creates a new user within the users table", async () => {
        try {
            const res = await UserModel.create({
                first_name: "Bob",
                last_name: "Smith",
                id: "123",
            });
            const newUser = res.rows[0];

            expect(newUser).toEqual({
                id: "123",
                first_name: "Bob",
                last_name: "Smith",
            });
        } catch (err) {
            console.log(err);
        }
    });

    test("updates a user in the users table", async () => {
        try {
            const createRes = await UserModel.create({
                first_name: "Bob",
                last_name: "Smith",
                id: "123",
            });
            const newUser = createRes.rows[0];

            expect(newUser).toEqual({
                id: "123",
                first_name: "Bob",
                last_name: "Smith",
            });

            const updateRes = await UserModel.update({
                id: "123",
                first_name: "Mike",
            });
            const user = updateRes.rows[0];

            expect(user).toEqual({
                first_name: "Mike",
                last_name: "Smith",
            });
        } catch (err) {
            console.log(err);
        }
    });

    test("deletes a user in the users table", async () => {
        try {
            await UserModel.create({
                first_name: "Bob",
                last_name: "Smith",
                id: "123",
            });

            await UserModel.delete("123");

            const verifyRes = await UserModel.get("123");

            expect(verifyRes).toBeNull;
        } catch (err) {
            console.log(err);
        }
    });
});
