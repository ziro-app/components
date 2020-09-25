module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    node: "current",
                },
            },
        ],
        "@babel/preset-react",
        [
            "@babel/preset-typescript",
            {
                allowNamespaces: true,
            },
        ],
    ],
    plugins: ["@babel/plugin-transform-runtime"],
};
