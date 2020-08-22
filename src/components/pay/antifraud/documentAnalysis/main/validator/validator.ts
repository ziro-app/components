import { FullOCR } from "@bit/vitorbarbosa19.ziro.pay.next-code"
import { Validation, validations, ClassResultsCollection } from "./validations"

const isDev = process.env.NODE_ENV === "development"

/**
 * Essa função cria um reducer para executar e concatenar todas as validações presentes no objeto validations,
 * excluindo aqueles que retornarem "dontApply"
 * @param firebaseData os dados do cartão salvos no firebase
 * @param zoopData os dados do cartão salvos na zoop
 * @param response a resposta da nextcode após analise do documento
 */
const createReducer = (
    firebaseData: import("@bit/vitorbarbosa19.ziro.firebase.catalog-user-data").FirebaseCard.Generic,
    zoopData: import("@bit/vitorbarbosa19.ziro.pay.zoop").ZoopCard.Info,
    response: FullOCR.Response.KnownDocument
) => (acc: ClassResultsCollection,[key,validation]:[string,Validation.Function]) => {
        const result = validation(firebaseData, zoopData, response)
        if(result.passed==="dontApply") return acc
        return { ...acc, [key]: result }
    }

/**
 * O validator é responsável por passar o resultado por todas as validações e retirar as que retornam "dontApply"
 * @param firebaseData os dados do cartão salvos no firebase
 * @param zoopData os dados do cartão salvos na zoop
 * @param response a resposta da nextcode após analise do documento
 */
export function validator(
    firebaseData: import("@bit/vitorbarbosa19.ziro.firebase.catalog-user-data").FirebaseCard.Generic,
    zoopData: import("@bit/vitorbarbosa19.ziro.pay.zoop").ZoopCard.Info,
    response: FullOCR.Response.KnownDocument
): ClassResultsCollection {
    const reducer = createReducer(firebaseData,zoopData,response)
    const results = Object.entries(validations).reduce(reducer,{} as ClassResultsCollection)
    if(isDev) console.log('validation results',results)
    return results
}

export type Validator = typeof validator