export default (path: string,appName: string = "ziro-app-data") => {
    return `https://console.firebase.google.com/project/${appName}/firestore/data~2F${path.replace(/\//g,"~2F")}`
}