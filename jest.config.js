module.exports = {
    testPathIgnorePatterns: ["/node_modules/", "/public/", "/\\.cache/", "/\\.docz/"],
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
