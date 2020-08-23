module.exports = {
    plugins: ["prettier", "@typescript-eslint"],
    extends: ["airbnb-typescript", "react-app", "prettier"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
    },
    settings: {
        "import/resolver": {
            typescript: {
                alwaysTryTypes: true,
            },
        },
    },
    rules: {
        "object-curly-spacing": ["warn", "always"],
        "no-unused-vars": [
            "warn",
            {
                vars: "all",
                args: "none",
            },
        ],
        "prefer-optional-chain": "always",
        indent: "off",
        quotes: "off",
        "@typescript-eslint/indent": ["error", 4],
        "@typescript-eslint/quotes": ["error", "double"],
        "@typescript-eslint/no-unused-vars": [
            "warn",
            {
                vars: "all",
                args: "none",
            },
        ],
        "@typescript-eslint/no-explicit-any": [
            "error",
            {
                ignoreRestArgs: true,
            },
        ],
        "max-len": [
            "warn",
            {
                code: 120,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreComments: true,
            },
        ],
        "no-plusplus": [
            "error",
            {
                allowForLoopAfterthoughts: true,
            },
        ],
        "react/jsx-key": "error",
        "import/no-extraneous-dependencies": [
            "error",
            {
                devDependencies: ["**/*.test.js", "**/*.test.jsx", "**/*.test.ts", "**/*.test.tsx", "src/tests/**/*"],
            },
        ],
        "import/prefer-default-export": "off",
        "react/jsx-props-no-spreading": "off",
        "react/jsx-indent": ["error", 4],
        "react/jsx-boolean-value": "off",
        "react/prop-types": "off",
        "react/no-unescaped-entities": "off",
        "react/jsx-one-expression-per-line": "off",
        "react/jsx-wrap-multilines": "off",
        "react/destructuring-assignment": "off",
    },
};
