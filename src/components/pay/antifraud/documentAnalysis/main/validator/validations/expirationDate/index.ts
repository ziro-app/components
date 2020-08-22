import { is } from "@bit/vitorbarbosa19.ziro.pay.next-code"
import { prompt, FullOCRPromptMessage } from "ziro-messages/dist/src/catalogo/antifraude/fullOCR"
import { dateFromString, dateFromThreshold } from "./utils"
import { Validation } from "../types"

/**
 * Razões pelas quais essas validação pode falhar
 */
export type ExpirationDateReason = 
    |FullOCRPromptMessage<"MISSING_EXP_DATE">
    |FullOCRPromptMessage<"EXPIRED_DOC",{ threshold: number }>

/**
 * Essa validação é responsável por checar a data de expedição do documento enviado,
 * ela irá falhar caso essa data não possa ser extraída ou caso a idade do documento seja maior do que o threshold
 * @param _firebaseData os dados do cartão salvos no firebase
 * @param _zoopData os dados do cartão salvos na zoop
 * @param response a resposta da nextcode após analise do documento
 */
export const expirationDate: Validation.Function<never,ExpirationDateReason> = (_firebaseData, _zoopData, response) => {
    if(is.CNH.Verso(response)||is.RG.Frente(response)) return { passed: 'dontApply' }
    const exp = is.RG(response) ? response.extracted.dataExpedicao : response.extracted.dataEmissao
    if(exp==="") return { passed: false, reason: prompt.MISSING_EXP_DATE }
    const threshold = 10
    if(dateFromString(exp) < dateFromThreshold(threshold))
        return { passed: false, reason: prompt.EXPIRED_DOC.withAdditionalData({ threshold }) }
    return { passed: true }
}