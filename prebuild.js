const fs = require("fs");

//get jsons
const packageJson = require("./package.json");
const dependenciesJson = require("./typescriptComponentsDependencies.json");
const tsconfigJson = require("./tsconfig.json");

//get Components
const components = require("./typescriptComponents");

//check dep
const checkDep = (name, n, c) => (!c && n === name) || (c === "*" && name.includes(n)) || name === n + "/" + c;

//env
const setEnv = (path) => ({
    compiler: {
        "vitorbarbosa19.ziro/compilers/react-typescript": {
            rawConfig: {
                tsconfig: {
                    compilerOptions: {
                        outDir: `./dist/src/components/${path}`,
                        target: "ES5",
                        module: "CommonJS",
                        inlineSources: true,
                        inlineSourceMap: true,
                        removeComments: false,
                    },
                },
            },
        },
    },
});

packageJson.bit.overrides = {};
tsconfigJson.compilerOptions.paths = {};
components.forEach(([path, name]) => {
    //get extra dependencies
    const [, deps] = Object.entries(dependenciesJson).find(([key]) => checkDep(name, ...key.split("/"))) || [null, {}];
    if (deps.peerDependencies) {
        deps.dependencies = {
            ...(deps.dependencies || {}),
            ...Object.entries(deps.peerDependencies).reduce((acc, [key]) => ({ ...acc, [key]: "-" }), {}),
        };
    }
    //write override
    packageJson.bit.overrides[name] = {
        env: setEnv(path),
        ...deps,
    };
    //set tsconfig paths
    tsconfigJson.compilerOptions.paths[`@bit/vitorbarbosa19.ziro.${name.replace("/", ".")}`] = [`components/${path}`];
});

fs.writeFileSync(__dirname + "/package.json", JSON.stringify(packageJson, null, 2));
fs.writeFileSync(__dirname + "/tsconfig.json", JSON.stringify(tsconfigJson, null, 2));
