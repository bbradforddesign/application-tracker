export interface UserFields {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    auth_id: string;
}

export interface User extends UserFields {
    id: string;
}
