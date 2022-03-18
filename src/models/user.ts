export interface UserFields {
    first_name: string;
    last_name: string;
}

export interface User extends UserFields {
    id: number;
}
