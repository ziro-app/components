const fs = require('fs');

//get jsons
const packageJson = require('./package.json');
const dependenciesJson = require('./typescriptComponentsDependencies.json');
const tsconfigJson = require('./tsconfig.json');

//env
const setEnv = (path) => ({
  "compiler": {
    "bit.envs/compilers/react-typescript": {
      "rawConfig": {
        "tsconfig": {
          "compilerOptions": {
            "outDir": `./dist/src/components/${path}`,
            "target": "ES5",
            "module": "CommonJS",
            "inlineSources": true,
            "inlineSourceMap": true
          }
        }
      }
    }
  }
})

//get Components
const components = require('./typescriptComponents')

packageJson.bit.overrides = {}
tsconfigJson.compilerOptions.paths = {}
components.forEach(([path,name]) => {
    //write custom env with dist folder
    packageJson.bit.overrides[name] = {}
    packageJson.bit.overrides[name].env = setEnv(path)
    //get extra dependencies
    Object.entries(dependenciesJson).forEach(([key,value]) => {
        const [namespace,component] = key.split("/")
        if(
          (!component&&namespace===name)||
          (component==="*"&&name.includes(namespace))||
          (name===namespace+"/"+component)
        ) {
          if("devDependencies" in value) packageJson.bit.overrides[name].devDependencies = value.devDependencies
          if("dependencies" in value) packageJson.bit.overrides[name].dependencies = value.dependencies
        }
    })
    //set tsconfig paths
    const tsconfigName = name.replace("/",".")
    tsconfigJson.compilerOptions.paths[`@bit/vitorbarbosa19.ziro.${tsconfigName}`] = [`components/${path}`]
})

fs.writeFileSync(__dirname+"/package.json",JSON.stringify(packageJson,null,2))
fs.writeFileSync(__dirname+"/tsconfig.json",JSON.stringify(tsconfigJson,null,2))