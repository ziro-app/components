const chars = "abcdefghijklmnopqrstuvwxyz";
type Primitives = "string" | "array" | "object" | "int" | "decimal" | "null" | "undefined";

export const randomChar = () => chars.charAt(Math.floor(Math.random() * chars.length));

export const createRandomWord = (length?: number) => {
    length = length || 3 + Math.ceil(Math.random() * 10);
    return Array.from(Array(length).keys()).map(randomChar).join("");
};

export const createRandomName = (lengthFirstName?: number, lengthLastName?: number) => {
    return createRandomWord(lengthFirstName) + " " + createRandomWord(lengthLastName);
};

export const randomPrimitiveType = (): Primitives => {
    const num = Math.random();
    //7 primitives -> 1/7
    if (num < 1 / 7) return "string";
    if (num < 2 / 7) return "array";
    if (num < 3 / 7) return "object";
    if (num < 4 / 7) return "int";
    if (num < 5 / 7) return "decimal";
    if (num < 6 / 7) return "null";
    return "undefined";
};

export function randomPrimitive(type: "string", length?: number): string;
export function randomPrimitive(type: "array", length?: number, avoid?: Primitives[]): any[];
export function randomPrimitive(type: "object", deep?: number, avoid?: Primitives[]): object;
export function randomPrimitive(type: "int", range?: number): number;
export function randomPrimitive(type: "decimal", range?: number): number;
export function randomPrimitive(type: "null"): null;
export function randomPrimitive(type: "undefined"): undefined;
export function randomPrimitive(type: ([Primitives, number] | Primitives)[], n?: any, avoid?: Primitives[]): any;
export function randomPrimitive(): any;
export function randomPrimitive(type: Primitives | ([Primitives, number] | Primitives)[] = randomPrimitiveType(), n?: any, avoid?: Primitives[]) {
    if (Array.isArray(type)) {
        const maybeArray = type[Math.floor(type.length * Math.random())];
        if (Array.isArray(maybeArray)) {
            type = maybeArray[0];
            n = maybeArray[1];
        } else type = maybeArray;
    }
    if (avoid && avoid.includes(type)) return randomPrimitive(randomPrimitiveType() as any, n, avoid);
    switch (type) {
        case "string":
            return createRandomWord(n);
        case "array":
            return createRandomArray(n, avoid);
        case "object":
            return createRandomObject(n, avoid);
        case "int":
            return Math.round((n || 100) * Math.random());
        case "decimal":
            return (n || 100) * Math.random();
        case "null":
            return null;
        case "undefined":
            return undefined;
    }
}

const fp = (avoid: Primitives[]): Primitives[] => ["string", "int", "decimal", "null", "undefined"].filter((p) => !avoid.includes(p as any)) as any;

export const createRandomArray = (length?: number, avoid: Primitives[] = [], type?: Primitives) => {
    const primitivesButArrayAndObject: Primitives[] = fp(avoid);
    length = length || randomPrimitive("int", 10);
    if (length === 0) length = 1;
    return Array.from(Array(length).keys()).map(() => {
        if (type) return randomPrimitive(type as any);
        const prob = Math.random();
        if (prob < 1 / 7) return randomPrimitive("object", 1, avoid);
        if (prob < 2 / 7) return randomPrimitive("array", Math.floor(Math.max(length / 2, 1)), avoid);
        return randomPrimitive(primitivesButArrayAndObject);
    });
};

export const createRandomObject = (deep = 3, avoid: Primitives[] = []) => {
    const obj: object = {};
    const numOfAttributes = randomPrimitive("int", 10);
    for (var i = 0; i < numOfAttributes; i++) {
        const key = createRandomWord();
        const primitives: any = ["string", "int", "decimal", "null", "undefined"].filter((p) => !avoid.includes(p as any));
        if (deep === 1) obj[key] = randomPrimitive(primitives);
        else obj[key] = randomPrimitive([...primitives, "array", ["object", deep - 1]], undefined, avoid);
    }
    return obj;
};
