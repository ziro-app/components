import { is } from "@bit/vitorbarbosa19.ziro.pay.next-code";
import { prompt, FullOCRPromptMessage } from "ziro-messages/dist/src/catalogo/antifraude/fullOCR";
import { prompt as cprompt } from "ziro-messages/dist/src/catalogo/antifraude/common";
import { Validation } from "../types";
import match from "./algorithms";

/**
 * Razões pelas quais essa validação pode falhar
 */
export type NameReason =
    | FullOCRPromptMessage<"FIRST_NAME_MISMATCH", { holder_name: string; docName: string }>
    | FullOCRPromptMessage<"LAST_NAME_MISMATCH", { holder_name: string; docName: string }>
    | typeof cprompt.MISSING_EXTRACTED_DATA;

/**
 * Essa validação é responsável por checar se o nome digitado no cartão e o nome extraido do documento
 * coincidem, caso o primeiro nome ou o ultimo nome não coincidam essa validação irá falhar
 * @param _firebaseData os dados do cartão contidos no firebase
 * @param zoopData os dados do cartão contidos na zoop
 * @param response a resposta da nextcode após analise do documento
 */
export const name: Validation.Function<never, NameReason> = (_firebaseData, { holder_name }, response) => {
    if (is.RG.Frente(response) || is.CNH.Verso(response)) return { passed: "dontApply" };
    if (!("extracted" in response)) return { passed: false, reason: cprompt.MISSING_EXTRACTED_DATA };
    if (!holder_name) return { passed: false, reason: cprompt.MISSING_EXTRACTED_DATA };
    const docName = is.BackgroundCheck(response) ? response.found.name : response.extracted.nome;
    if (docName === "") return { passed: false, reason: cprompt.MISSING_EXTRACTED_DATA };
    try {
        const [matchFirstName, matchLastName] = match(holder_name, docName);
        if (!matchFirstName) return { passed: false, reason: prompt.FIRST_NAME_MISMATCH.withAdditionalData({ holder_name, docName }) };
        if (!matchLastName) return { passed: false, reason: prompt.LAST_NAME_MISMATCH.withAdditionalData({ holder_name, docName }) };
        return { passed: true };
    } catch {
        return { passed: false, reason: cprompt.MISSING_EXTRACTED_DATA };
    }
};
