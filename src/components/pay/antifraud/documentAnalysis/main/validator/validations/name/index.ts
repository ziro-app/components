import { is } from "@bit/vitorbarbosa19.ziro.pay.next-code"
import { prompt, FullOCRPromptMessage } from "ziro-messages/dist/src/catalogo/antifraude/fullOCR"
import { Validation } from "../types"
import match from './algorithms'

/**
 * Razões pelas quais essa validação pode falhar
 */
export type NameReason = 
    |FullOCRPromptMessage<"FIRST_NAME_MISMATCH",{ holder_name: string, docName: string }>
    |FullOCRPromptMessage<"LAST_NAME_MISMATCH",{ holder_name: string, docName: string }>

/**
 * Essa validação é responsável por checar se o nome digitado no cartão e o nome extraido do documento
 * coincidem, caso o primeiro nome ou o ultimo nome não coincidam essa validação irá falhar
 * @param _firebaseData os dados do cartão contidos no firebase
 * @param zoopData os dados do cartão contidos na zoop
 * @param response a resposta da nextcode após analise do documento
 */
export const name: Validation.Function<never,NameReason> = (_firebaseData, { holder_name }, response) => {
    if(is.RG.Frente(response)||is.CNH.Verso(response)) return { passed: "dontApply" }
    const docName = is.BackgroundCheck(response) ? response.found.name : response.extracted.nome
    const [matchFirstName, matchLastName] = match(holder_name, docName)
    if(!matchFirstName) return { passed: false, reason: prompt.FIRST_NAME_MISMATCH.withAdditionalData({ holder_name, docName }) }
    if(!matchLastName) return { passed: false, reason: prompt.LAST_NAME_MISMATCH.withAdditionalData({ holder_name, docName }) }
    return { passed: true }
}