import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

// config and connect to postgres
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432"),
});

pool.on("connect", (client) => [
    client.query(`SET search_path TO '${process.env.NODE_ENV}'`),
]);

export default pool;
