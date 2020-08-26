import { FullOCR } from "@bit/vitorbarbosa19.ziro.pay.next-code";
import tuple from "@bit/vitorbarbosa19.ziro.utils.tuple";
import { prompt } from "ziro-messages/dist/src/catalogo/antifraude/fullOCR";
import { ClassResultsCollection } from "./validations";

/**
 * Essas são as mensagens que devem causar um throw no processamento, as que não estiverem aqui passarão
 * para a parte de envio de selfie
 */
export const messagesThatShouldThrow = tuple(
    prompt.CANNOT_ANALYZE_FACE.name,
    prompt.NO_FACE_OBJECT.name,
    prompt.FIRST_NAME_MISMATCH.name,
    prompt.SAME_DOC_CNHV.name,
    prompt.SAME_DOC_RGF.name,
    prompt.SAME_DOC_RGV.name,
    prompt.PROBABILITY_UNDER_60.name,
);

/**
 * Essa função é responsável por pegar os resultados das validações e dar um throw caso a mensagem esteja
 * inclusa na lista
 * @param response a resposta da nextCode após analise do documento
 * @param url a url da imagem que foi enviada
 * @param results os resultados das validações
 */
export const processResults = (
    response: FullOCR.Response.KnownDocument,
    url: string,
    results: ClassResultsCollection,
) => {
    Object.values(results).forEach((result) => {
        if (result.passed === false && messagesThatShouldThrow.includes(result.reason.name as any))
            throw (result.reason as any).withAdditionalData({ response, url });
    });
};
