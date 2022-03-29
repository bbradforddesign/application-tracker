jest.mock("../../../services/validateAuth", () =>
    jest.fn((req, res, next) => {
        req.user = {
            sub: "123",
        };
        next();
    })
);

import app from "../../../app";
import request from "supertest";
import pool from "../../../db";

describe("GET /profile", () => {
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
        test("successfully returns a blank profile", async () => {
            const res = await request(app)
                .get("/user/profile")
                .set("Content-Type", "application/json");

            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                first_name: null,
                last_name: null,
            });
        });
    });
});
