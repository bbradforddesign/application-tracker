import app from "../../app";
import request from "supertest";
import pool from "../../db";

// wipe user table after every test
afterEach(async () => {
    const client = await pool.connect();
    client.query("TRUNCATE users;").then(() => {
        client.release();
    });
});

describe("POST /user", () => {
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
