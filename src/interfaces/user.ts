export interface UserFields {
    first_name?: string;
    last_name?: string;
    auth_id: string;
}

export interface User extends UserFields {
    id?: string;
}
