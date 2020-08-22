import { is, FullOCR } from "@bit/vitorbarbosa19.ziro.pay.next-code"
import { prompt, FullOCRPromptMessage } from "ziro-messages/dist/src/catalogo/antifraude/fullOCR"
import { Validation } from "../types"

/**
 * Razões pelas quais essas validação pode falhar
 */
export type FaceReason = 
    |FullOCRPromptMessage<"NO_FACE_OBJECT">
    |FullOCRPromptMessage<"CANNOT_ANALYZE_FACE",{ face: FullOCR.Face.Error }>
    |FullOCRPromptMessage<"UNRECOGNIZED_FACE_OBJECT",{ face: object }>

/**
 * Essa validação é responsável por checar se a face contida no documento foi corretamente reconhecida pela nextcode,
 * quando aplicável, se o objeto face não existe, assumimos que o documento não contém face, se o objeto face
 * contém erro então a nextcode não foi capaz de fazer a analise.
 * @param _firebaseData os dados do cartão salvos no firebase
 * @param _zoopData os dados do cartão salvos na zoop
 * @param response a resposta da nextcode após a analise do documento
 */
export const face: Validation.Function<never,FaceReason> = (_firebaseData, _zoopData, response) => {
    if(is.RG.Verso(response)||is.CNH.Verso(response)) return { passed: "dontApply" }
    if(!("face" in response)) return { passed: false, reason: prompt.NO_FACE_OBJECT }
    if(is.Face(response.face)) {
        if(is.Face.Success(response.face)) return { passed: true }
        if(is.Face.Error(response.face))
            return { passed: false, reason: prompt.CANNOT_ANALYZE_FACE.withAdditionalData({ face: response.face }) }
    }
    return { passed: false, reason: prompt.UNRECOGNIZED_FACE_OBJECT.withAdditionalData({ face: response.face }) }
}