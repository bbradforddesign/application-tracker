import app from "../../app";

import request from "supertest";

describe("GET /hello", () => {
    it("returns a JSON containing the message 'Hello'", async () => {
        const res = await request(app).get("/hello");

        expect(res.body).toMatchObject({
            message: "Hello",
        });
    });
});
