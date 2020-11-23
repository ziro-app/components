import { usePromiseShowingMessage } from "@bit/vitorbarbosa19.ziro.utils.async-hooks";
import { useCancelToken } from "@bit/vitorbarbosa19.ziro.utils.axios";
import { useUploadFirebaseCardPicture, FirebaseCardDocument } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { fullOCR, common } from "ziro-messages/dist/src/catalogo/antifraude";
import { isPrompt } from "ziro-messages";
import { analiseDocument, is } from "@bit/vitorbarbosa19.ziro.pay.next-code";
import { ZoopCard } from "@bit/vitorbarbosa19.ziro.pay.zoop";
import devCheck from "./devCheck";
import { validator, processResults } from "./validator";
import { UseFullOCR } from "./types";
import { supportPhoneNumber } from '@bit/vitorbarbosa19.ziro.utils.support-phone-number'

const isDev = process.env.NODE_ENV === "development";

export * from "./types";

export const useFullOCR = (firebaseCard: FirebaseCardDocument, zoopCardData: ZoopCard) => {
    const [uploadPicture] = useUploadFirebaseCardPicture(firebaseCard.id);
    const source = useCancelToken();
    const [analise, state] = usePromiseShowingMessage<UseFullOCR.Argument, UseFullOCR.ClassResult, UseFullOCR.Errors.Generic>(
        fullOCR.waiting.ANALYZING_DOC,
        async ({ picture }) => {
            try {
                if (!picture) throw { skipAttempt: true, error: common.prompt.NO_IMAGE.withAdditionalData({ where: "useFullOCR" }) };
                if (state.attempts === 3)
                    throw {
                        skipAttempt: true,
                        error: common.prompt.TOO_MANY_ATTEMPTS
                        .withAdditionalData({ where: "useFullOCR" }),
                    };

                const url = await uploadPicture(picture).catch((error) => {
                    throw common.prompt.CANNOT_UPLOAD_PICTURE_TO_STORAGE.withAdditionalData({ error, where: "useFullOCR" });
                });
                const response = await analiseDocument(url, source.token);

                if (isDev) devCheck(response);

                if (!is.Response(response)) throw fullOCR.prompt.UNRECOGNIZED_RESPONSE.withAdditionalData({ response, url });
                if (is.Response.Selfie(response)) throw fullOCR.prompt.SELFIE_TYPE.withAdditionalData({ response, url });
                if (is.Response.UnknownDocument(response)) throw fullOCR.prompt.UNKNOWN_DOCUMENT_TYPE.withAdditionalData({ response, url });
                const validations = validator(firebaseCard.data(), zoopCardData, response);
                processResults(response, url, validations);
                return { response: response as any, url, validations };
            } catch (err) {
                if ("skipAttempt" in err && err.skipAttempt) {
                    throw { skipAttempt: true, error: err.error
                        .withButtons([{
                            title: "Falar com Suporte", 
                            action: () => {
                                window.open(`https://api.whatsapp.com/send?phone=${supportPhoneNumber.replace(/\+|\s|\(|\)|-/g, "")}`, "_blank")
                            }
                        }]) 
                    }
                }

                if (isPrompt(err)) {
                    throw err.withButtons([
                        {
                            title: "Enviar novamente",
                            action: () => null,
                        },
                    ]);
                } else {
                    throw err;
                }
            }
        },
        [firebaseCard, zoopCardData, uploadPicture, source],
    );
    return [analise, state] as [typeof analise, typeof state];
};
