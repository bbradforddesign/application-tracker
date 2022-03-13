import express from "express";
import dotenv from "dotenv";
import { Pool } from "pg";

import indexRouter from "./routes/index";

const app = express();

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432"),
});

const dbConnect = async () => {
    try {
        await pool.connect();
    } catch (err) {
        console.log(err);
    }
};
dbConnect();

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});

app.use("/", indexRouter);

export default app;
