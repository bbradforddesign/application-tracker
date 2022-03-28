import app from "../../../app";
import request from "supertest";

describe("unauthorized requests", () => {
    test("rejecting an unauthorized request", async () => {
        const res = await request(app)
            .post("/user")
            .send({
                first_name: "John",
                last_name: "Doe",
            })
            .set("Content-Type", "application/json");

        expect(res.status).toBe(401);
    });
});
