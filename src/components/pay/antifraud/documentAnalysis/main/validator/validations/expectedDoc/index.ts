import { is } from "@bit/vitorbarbosa19.ziro.pay.next-code"
import { prompt, FullOCRPromptMessage } from "ziro-messages/dist/src/catalogo/antifraude/fullOCR"
import { Validation } from "../types"

/**
 * Razões pelas quais essas validação pode falhar
 */
export type ExpectedDocReason =
    |FullOCRPromptMessage<"SAME_DOC_RGF">
    |FullOCRPromptMessage<"SAME_DOC_RGV">
    |FullOCRPromptMessage<"SAME_DOC_CNHV">

/**
 * Essa validação deve checar se o usuário enviou o mesmo lado do documento duas vezes,
 * se é esperado a frente do RG é porque o verso já foi enviado e vice-versa, se docStatus
 * não existir no firebase então é a primeira vez que esse lado está sendo enviado
 * @param firebaseData os dados do cartão salvos no firebase
 * @param _zoopData os dados do cartão salvos no zoop
 * @param response a resposta da nextcode após analise da imagem
 */
export const expectedDoc: Validation.Function<never,ExpectedDocReason> = (firebaseData, _zoopData, response) => {
    if(is.CNH.Frente(response)||is.CNH.FrenteVerso(response)||is.RG.FrenteVerso(response)) return { passed: "dontApply" }
    if(!("docStatus" in firebaseData)) return { passed: "dontApply" }
    if(is.RG.Frente(response) && firebaseData.docStatus==="pendingRGV" ) return { passed: false, reason: prompt.SAME_DOC_RGF  }
    if(is.RG.Verso(response)  && firebaseData.docStatus==="pendingRGF" ) return { passed: false, reason: prompt.SAME_DOC_RGV  }
    if(is.CNH.Verso(response) && firebaseData.docStatus==="pendingCNHF") return { passed: false, reason: prompt.SAME_DOC_CNHV }
    return { passed: true }
}