type possibleTypes =
  | "undefined"
  | "object"
  | "boolean"
  | "number"
  | "string"
  | "function"
  | "bigint"
  | "symbol";

type possibleKeys = string | number | symbol;

const isDev = process.env.NODE_ENV === "development"

/**
 * Essa função checa a existência de chaves em um objeto
 *
 * @param keys Um array com todas as chaves a serem checadas
 * @param obj O objeto a ser checado
 */
export function checkKeys(keys: possibleKeys[], obj: any): boolean {
  if (typeof obj !== "object") return false;
  const check = keys.every((key) => key in obj);
  // if(isDev && !check) console.log('missing keys',{ obj, keys })
  return check
}

/**
 * Essa função checa se todas as chaves em um objeto possuem o mesmo tipo
 *
 * @param t O tipo esperado de todas as chaves do objeto
 * @param obj O objeto a ser checado
 */
export function checkTypes(
  t: possibleTypes | ((obj: any) => boolean),
  obj: any
): boolean {
  if (typeof obj !== "object") return false;
  const values = Object.values(obj);
  if (typeof t === "function") return values.every(t);
  const check = values.every((value) => typeof value === t);
  // if(isDev && !check) console.log('wrong types',{ obj, t })
  return check
}
