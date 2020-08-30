module.exports = {
    plugins: [
        {
            resolve: "gatsby-plugin-web-font-loader",
            options: {
                google: {
                    families: ["Rubik:500,600", "Work Sans:300,400,500"],
                },
            },
        },
        {
            resolve: "gatsby-optional-chaining",
        },
    ],
};
