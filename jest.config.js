module.exports = {
    transform: {
        "\\.(js|jsx|ts|tsx)?$": "babel-jest",
    },
    testPathIgnorePatterns: ["/node_modules/", "/public/", "/\\.cache/", "/\\.docz/"],
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
