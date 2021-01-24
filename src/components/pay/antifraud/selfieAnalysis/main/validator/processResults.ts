import { Biometry } from "@bit/vitorbarbosa19.ziro.pay.next-code";
import tuple from "@bit/vitorbarbosa19.ziro.utils.tuple";
import { prompt } from "ziro-messages/dist/src/catalogo/antifraude/biometry";
import { ClassResultsCollection } from "./validations";
import * as common from "ziro-messages/dist/src/catalogo/antifraude/common";

/**
 * Essas são as mensagens que devem causar um throw no processamento, as que não estiverem aqui passarão para aprovação
 * automática ou manual
 */
export const messagesThatShouldThrow = tuple(
    prompt.CONFIDENCE_UNDER_60.code,
    prompt.DOC_NO_FACE.code,
    prompt.DOC_TOO_MANY_FACES.code,
    prompt.SELFIE_NO_FACE.code,
    prompt.SELFIE_TOO_MANY_FACES.code,
    prompt.FAILED_COMPARISON.code,
    prompt.NOT_IDENTICAL.code,
    common.prompt.MISSING_EXTRACTED_DATA.code,
);

/**
 * Essa função é responsável por pegar os resultados das validações e dar um throw caso a mensagem esteja
 * inclusa na lista
 * @param response a resposta da nextCode após analise do documento
 * @param url a url da imagem que foi enviada
 * @param results os resultados das validações
 */
export const processResults = (response: Biometry.Response, url: string, results: ClassResultsCollection) => {
    Object.values(results).forEach((result) => {
        if (result.passed === false && messagesThatShouldThrow.includes(result.reason.code as any))
            throw (result.reason as any).withAdditionalData({ response, url });
    });
};
