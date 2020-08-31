import { Biometry } from "@bit/vitorbarbosa19.ziro.pay.next-code";
import { ZoopCard } from "@bit/vitorbarbosa19.ziro.pay.zoop";
import { FirebaseCard } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { Validation, validations, ClassResultsCollection } from "./validations";

const isDev = process.env.NODE_ENV === "development";

/**
 * Essa função cria um reducer para executar e concatenar todas as validações presentes no objeto validations,
 * excluindo aqueles que retornarem "dontApply"
 * @param firebaseData os dados do cartão salvos no firebase
 * @param response a resposta da nextcode após analise do documento
 */
const createReducer = (firebaseData: FirebaseCard.BeforeSelfiePhase, response: Biometry.Response) => (
    acc: ClassResultsCollection,
    [key, validation]: [string, Validation.Function],
) => {
    const result = validation(firebaseData, response);
    return { ...acc, [key]: result };
};

/**
 * O validator é responsável por passar o resultado por todas as validações e retirar as que retornam "dontApply"
 * @param firebaseData os dados do cartão salvos no firebase
 * @param response a resposta da nextcode após analise do documento
 */
export function validator(
    firebaseData: FirebaseCard.BeforeSelfiePhase,
    response: Biometry.Response,
): ClassResultsCollection {
    const reducer = createReducer(firebaseData, response);
    const results = Object.entries(validations).reduce(reducer, {} as ClassResultsCollection);
    if (isDev) console.log("validation results", results);
    return results;
}

export type Validator = typeof validator;
