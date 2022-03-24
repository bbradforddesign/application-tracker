const express_oauth2_jwt_bearer = jest.createMockFromModule(
    "express-oauth2-jwt-bearer"
);

// mock JWT auth during testing
const auth = () => {
    return (req, res, next) => {
        next();
    };
};

express_oauth2_jwt_bearer.auth = auth;

module.exports = express_oauth2_jwt_bearer;
