const fs = require("fs");

//get jsons
const packageJson = require("./package.json");
const tsconfigJson = require("./tsconfig.json");

//get Components
const components = require("./typescriptComponents");

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
                        skipLibCheck: true,
                        lib: ["dom", "dom.iterable", "esnext"],
                        inlineSources: true,
                        inlineSourceMap: true,
                        removeComments: false,
                    },
                },
            },
        },
    },
    tester: "bit.envs/testers/jest",
});

tsconfigJson.compilerOptions.paths = {};
components.forEach(({ path, name, deps }) => {
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
