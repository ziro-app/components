const fs = require("fs");
const jestConfig = require("./jest.config");
let bitmap = fs.readFileSync("../components/.bitmap").toString();
const index = bitmap.indexOf("*/");
bitmap = JSON.parse(bitmap.slice(index + 2));

jestConfig.moduleNameMapper = {};

Object.entries(bitmap).forEach(([dep, { mainFile }]) => {
    if (!dep.startsWith("vitorbarbosa19")) return;
    const mockModule = `^@bit/${dep.split("@")[0].replace(/\//g, ".")}$`;
    const alias = `<rootDir>/${mainFile.split("/").slice(0, -1).join("/")}`;
    jestConfig.moduleNameMapper[mockModule] = alias;
});

const write = `module.exports = ${JSON.stringify(jestConfig, null, 4)}`;

fs.writeFileSync("./jest.config.js", write);
