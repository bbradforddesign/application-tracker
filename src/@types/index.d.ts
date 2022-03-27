declare global {
    namespace Express {
        interface User {
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
