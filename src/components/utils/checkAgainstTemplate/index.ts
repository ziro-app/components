export default function checkAgainstTemplate<T>(template: T, obj: any): obj is T {
    if (template === null && obj !== null) return false;
    if (template !== null && obj === null) return false;
    if (template === null && obj === null) return true;
    if (typeof template === "object" && typeof obj === "object") {
        const checker = (key: string) => key in obj && checkAgainstTemplate((template as any)[key], obj[key]);
        return Object.keys(template).every(checker);
    } else return typeof template === typeof obj;
}

export type Identity<T> = { [K in keyof T]: T[K] };
export type Replace<T, K extends keyof T, R> = Identity<Pick<T, Exclude<keyof T, K>> & { [P in K]: R }>;
