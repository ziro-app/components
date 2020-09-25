module.export = {
    roots: ["<rootDir>/src/__tests__"],
    transform: {
        "\\.(js|jsx|ts|tsx)?$": "babel-jest",
    },
    testMatch: ["<rootDir>/src/**/>(*.)test.{js, ts, jsx, tsx}"],
    moduleFileExtensions: ["js", "jsx", "json", "node"],
    testPathIgnorePatterns: ["/node_modules/", "/public/", "/.cache/", "/.docz/"],
    setupFilesAfterEnv: ["jest-dom/extend-expect", "react-testing-library/cleanup-after-each"],
};
