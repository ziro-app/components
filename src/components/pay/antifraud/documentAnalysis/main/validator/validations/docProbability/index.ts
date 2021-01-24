import * as c from "ziro-messages/dist/src/catalogo/antifraude/common";
import { prompt, FullOCRPromptMessage } from "ziro-messages/dist/src/catalogo/antifraude/fullOCR";
import { Validation } from "../types";

/**
 * Razões pelas quais essas validação pode falhar
 */
export type DocProbabilityReason =
    | FullOCRPromptMessage<"PROBABILITY_UNDER_60", { probability: number }>
    | FullOCRPromptMessage<"PROBABILITY_UNDER_90", { probability: number }>
    | typeof c.prompt.MISSING_EXTRACTED_DATA;

/**
 * Essa validação deve checar se a probabilidade do documento ser verdadeiro, retornada pela next-code
 * atende aos critérios estabelecidos pela Ziro
 * @param _firebaseData os dados do cartão salvos no firebase
 * @param _zoopData os dados do cartão salvos no zoop
 * @param response a resposta da nextcode após analise da imagem
 */
export const docProbability: Validation.Function<never, DocProbabilityReason> = (_firebaseData, _zoopData, response) => {
    if (!response) return { passed: false, reason: c.prompt.MISSING_EXTRACTED_DATA };
    if (!("fileInfo" in response)) return { passed: false, reason: c.prompt.MISSING_EXTRACTED_DATA };
    if (!("classifiedAs" in response.fileInfo)) return { passed: false, reason: c.prompt.MISSING_EXTRACTED_DATA };
    if (!("probability" in response.fileInfo.classifiedAs)) return { passed: false, reason: c.prompt.MISSING_EXTRACTED_DATA };
    const { probability } = response.fileInfo.classifiedAs;
    if (probability < 0.6) return { passed: false, reason: prompt.PROBABILITY_UNDER_60.withAdditionalData({ probability }) };
    if (probability < 0.9) return { passed: false, reason: prompt.PROBABILITY_UNDER_90.withAdditionalData({ probability }) };
    return { passed: true };
};
