CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
SELECT uuid_generate_v1();

CREATE TABLE user_account (
    id uuid DEFAULT uuid_generate_v1 (),
    first_name text,
    last_name text,
    auth_id text,
    CONSTRAINT unique_auth_id UNIQUE (auth_id)
);