import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";

if (!process.env.JWKS_URI) {
    throw new Error("jwks uri required");
}

const validateAuth = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.JWKS_URI,
    }),
    audience: process.env.AUDIENCE,
    issuer: process.env.ISSUER,
    algorithms: ["RS256"],
});

export default validateAuth;
