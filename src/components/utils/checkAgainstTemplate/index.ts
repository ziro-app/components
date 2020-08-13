export default function checkAgainstTemplate<T>(template: T,obj: any): obj is T {
    if(typeof template === "object" && typeof obj === "object")
        return Object.keys(template).every(key => key in obj && checkAgainstTemplate((template as any)[key],obj[key]))
    else
        return typeof template === typeof obj
}