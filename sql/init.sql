CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
SELECT uuid_generate_v1();

CREATE SCHEMA IF NOT EXISTS test;

    CREATE TABLE test.users (
        id uuid DEFAULT uuid_generate_v1 (),
        first_name text,
        last_name text
    );

CREATE SCHEMA IF NOT EXISTS dev;

    CREATE TABLE dev.users (
        id uuid DEFAULT uuid_generate_v1 (),
        first_name text,
        last_name text
    );