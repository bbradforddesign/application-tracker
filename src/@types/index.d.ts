declare global {
    namespace Express {
        interface User {
            email: string;
            iss: string;
            sub: string;
            aud: string;
            iat: string;
            exp: string;
            azp: string;
            gty: string;
            permissions?: string[];
        }
    }
}

export {};
