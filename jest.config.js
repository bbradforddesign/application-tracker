export default {
    clearMocks: true,
    coverageProvider: "v8",
    modulFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
    roots: ["<rootDir>/src"],
    testMatch: ["**/__tests__/**/*.[jt]s(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
};
