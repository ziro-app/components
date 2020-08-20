const fs = require('fs');

//readComponents and get which ones have ts files
const componentsPath = __dirname+"/src/components/"

function checkForTsFile(components, dirName = "") {
    fs.readdirSync(componentsPath+dirName,{ withFileTypes: true }).forEach((innerDir) => {
        if(innerDir.isDirectory()) checkForTsFile(components, dirName+innerDir.name+"/")
        else if(innerDir.name.includes(".ts")) {
            const [namespace,component] = dirName.slice(0,-1).split("/")
            const componentPath = component ? `${namespace}/${component}` : namespace
            const componentName = componentPath.replace(/[A-Z]{1,3}/g,m => "-"+m.toLowerCase()).replace(/^-/g,"").replace(/\/-/g,"/")
            components.add([componentPath,componentName])
        }
    })
}

function getTsComponents() {
    const tsComponents = new Set()
    checkForTsFile(tsComponents)
    return tsComponents
}

module.exports = getTsComponents()