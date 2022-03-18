import pool from "../../db";
import { registerUser } from "../../controllers/user";
import { UserFields } from "../../models/user";
import { getUser, createUser } from "../../services/user";

// wipe user table after every test
afterEach(async () => {
    const client = await pool.connect();
    client.query("TRUNCATE users;").then(() => {
        client.release();
    });
});

describe("User services", () => {
    test("retrieves user from the users table", async () => {
        try {
            const newUser = await registerUser({
                first_name: "Bob",
                last_name: "Smith",
            });
            const user = await getUser(newUser.id);
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
            const newUser = await registerUser(userFields);
            expect(newUser.first_name).toEqual(userFields.first_name);
            expect(newUser.last_name).toEqual(userFields.last_name);
            expect(newUser.id).not.toBeNull();
        } catch (err) {
            console.log(err);
        }
    });
});
