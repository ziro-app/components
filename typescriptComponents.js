const fs = require("fs");
const package = require("./package.json");

const bitmap = fs.readFileSync(__dirname + "/.bitmap").toString();

/**
 * Transform camelCase to dash-case
 * @param {*} str
 */
const transform = (str) =>
    str
        .replace(/[A-Z]{1,3}/g, (m) => "-" + m.toLowerCase())
        .replace(/^-/g, "")
        .replace(/\/-/g, "/");

/**
 * Get All dependencies from a file, exclude those that start with a dot
 * @param {*} content
 */
const getDependenciesFromFile = (content) => {
    const deps = [];
    const regex = /\bimport [\S,{ ]* from "(\S+)";/g;
    let match = regex.exec(content);
    while (match) {
        const dep = match[1];
        if (!dep.startsWith(".")) {
            if (!dep.startsWith("@")) deps.push(dep.split("/")[0]);
            else deps.push(dep);
            if (dep === "reactfire") deps.push("firebase");
        }
        match = regex.exec(content);
    }
    return deps;
};

//readComponents and get which ones have ts files
const componentsPath = __dirname + "/src/components/";

const namespaces = ["pay", "utils", "antifraud", "firebase"];

/**
 * get all dependencies from all files from a component
 * @param {*} name
 * @param {*} componentDir
 * @param {*} fileDir
 */
function getDependenciesFromComponent(componentDir) {
    const componentDeps = new Set();
    fs.readdirSync(componentDir, { withFileTypes: true }).forEach((innerDir) => {
        if (innerDir.name === ".DS_Store") return;
        if (innerDir.isFile()) {
            if (innerDir.name.includes(".test.ts")) return;
            content = fs.readFileSync(componentDir + "/" + innerDir.name).toString();
            getDependenciesFromFile(content).forEach(componentDeps.add, componentDeps);
        }
        if (innerDir.isDirectory()) {
            getDependenciesFromComponent(componentDir + "/" + innerDir.name).forEach(componentDeps.add, componentDeps);
        }
    });
    return componentDeps;
}

const components = new Map();

const constructComponentObject = (path) => {
    const dir = componentsPath + path;
    const fileDependencies = getDependenciesFromComponent(dir);
    const name = transform(path);
    const deps = {
        dependencies: {},
        peerDependencies: {},
        devDependencies: {
            "@types/jest": "+",
        },
    };
    fileDependencies.forEach((dep) => {
        let version = "+";
        if (/^@bit.*$/.test(dep)) {
            const localBitName = dep.replace("@bit/", "").replace(/\./g, "/").replace("/ziro", ".ziro");
            const regex = new RegExp(`${localBitName}@(\\S+)"`, "g");
            const [major, minor] = regex.exec(bitmap)[1].split(".");
            version = `${major}.${minor}.x`;
        } else {
            const packageDeps = { ...package.dependencies, ...package.devDependencies };
            const [major, minor, ...patch] = packageDeps[dep].replace("^", "").replace(">=", "").split(".");

            version = `${major}.${minor}.${Number.isNaN(Number(patch.join("."))) ? patch.join(".") : "x"}`;
        }
        deps.dependencies[dep] = "-";
        if (dep === "react") deps.dependencies["@types/react"] = "-";
        else deps.peerDependencies[dep] = version;
    });
    components.set(name, { name, path, deps });
};

fs.readdirSync(componentsPath, { withFileTypes: true }).forEach((innerDir1) => {
    if (innerDir1.name === ".DS_Store") return;
    let dir = componentsPath + innerDir1.name;
    if (fs.readdirSync(dir, { withFileTypes: true }).some((innerDir2) => innerDir2.name.includes(".ts"))) {
        constructComponentObject(innerDir1.name);
    }
    if (namespaces.includes(innerDir1.name)) {
        fs.readdirSync(dir, { withFileTypes: true }).forEach((innerDir2) => {
            if (innerDir2.name === ".DS_Store") return;
            if (fs.readdirSync(dir + "/" + innerDir2.name, { withFileTypes: true }).some((innerDir3) => innerDir3.name.includes(".ts"))) {
                constructComponentObject(innerDir1.name + "/" + innerDir2.name);
            }
        });
    }
});

/**
 * Add peerDependencies of peerDependencies
 */
function getPeerDependenciesOfPeerDependencies() {
    const _components = Object.fromEntries(components.entries());

    Object.entries(_components).forEach(([name, values]) => {
        const { deps } = values;
        Object.keys(deps.peerDependencies).forEach((dep) => {
            if (/^@bit.*$/.test(dep)) {
                const depName = dep.replace("@bit/vitorbarbosa19.ziro.", "").replace(/\./g, "/");
                if (_components[depName]) {
                    values.deps.peerDependencies = {
                        ...values.deps.peerDependencies,
                        ..._components[depName].deps.peerDependencies,
                    };
                }
            }
        });
        components.set(name, values);
    });
}

getPeerDependenciesOfPeerDependencies();
getPeerDependenciesOfPeerDependencies();
getPeerDependenciesOfPeerDependencies();
getPeerDependenciesOfPeerDependencies();

module.exports = components;
