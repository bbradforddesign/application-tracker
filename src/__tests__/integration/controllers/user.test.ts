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
import UserModel from "../../../models/user";

describe("GET /profile", () => {
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

    describe("authorized requests", () => {
        test("returns 404 for missing profile", async () => {
            const res = await request(app)
                .get("/user")
                .set("Content-Type", "application/json");

            expect(res.status).toBe(404);
        });

        test("returns an existing profile", async () => {
            await UserModel.create({
                id: "123",
                first_name: "Paul",
                last_name: "Blart",
            });
            const res = await request(app)
                .get("/user")
                .set("Content-Type", "application/json");

            expect(res.status).toBe(200);
            expect(res.body).toEqual({
                first_name: "Paul",
                last_name: "Blart",
            });
        });
    });
});
