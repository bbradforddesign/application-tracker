import app from "../../../app";
import request from "supertest";
import pool from "../../../db";

describe("POST /user", () => {
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

    describe("authorized requests", () => {
        test("successfully registers a user", async () => {
            const res = await request(app)
                .post("/user")
                .send({
                    first_name: "John",
                    last_name: "Doe",
                })
                .set("Content-Type", "application/json");

            expect(res.status).toBe(200);
            expect(res.body.first_name).toBe("John");
            expect(res.body.last_name).toBe("Doe");
            expect(res.body.id).not.toBeNull();
        });

        test("fails user registration if missing last name", async () => {
            const res = await request(app)
                .post("/user")
                .send({ first_name: "John" })
                .set("Content-Type", "application/json");

            expect(res.status).toBe(400);
        });

        test("fails user registration if missing first name", async () => {
            const res = await request(app)
                .post("/user")
                .send({ last_name: "Doe" })
                .set("Content-Type", "application/json");

            expect(res.status).toBe(400);
        });
    });
});
