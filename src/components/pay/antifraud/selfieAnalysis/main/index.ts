import {
    FirebaseCardDocument,
    useUploadFirebaseCardPicture,
} from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { useCancelToken } from "@bit/vitorbarbosa19.ziro.utils.axios";
import { biometry as nextCodeBiometry, is } from "@bit/vitorbarbosa19.ziro.pay.next-code";
import { docClassify as nextCodeDocClassify, is as isV2 } from '../../../NextCodeV2'
import { usePromiseShowingMessage } from "@bit/vitorbarbosa19.ziro.utils.async-hooks";
import { biometry, common } from "ziro-messages/dist/src/catalogo/antifraude";
import { isPrompt, ZiroPromptMessage } from "ziro-messages";
import { validator, processResults } from "./validator";
import { approvalType } from "./approvalType";
import { UseBiometry } from "./types";
import { supportPhoneNumber } from '@bit/vitorbarbosa19.ziro.utils.support-phone-number'

export * from "./types";

export const useBiometry = (firebaseCard: FirebaseCardDocument) => {
    const [uploadPicture] = useUploadFirebaseCardPicture(firebaseCard.id);
    const source = useCancelToken();
    const [cbk, state] = usePromiseShowingMessage<
        UseBiometry.Argument,
        UseBiometry.ClassResult,
        UseBiometry.Errors.Generic
    >(
        biometry.waiting.ANALYZING_FACE,
        async ({ picture }) => {
            try {
                if (!picture)
                    throw { skipAttempt: true, error: common.prompt.NO_IMAGE.withAdditionalData({ where: "useBiometry" }) };
                if (state.attempts === 3)
                    throw {
                        skipAttempt: true,
                        error: common.prompt.TOO_MANY_ATTEMPTS
                        .withAdditionalData({ where: "useBiometry" }),
                    };
                const firebaseData = firebaseCard.data();
                if (firebaseData.status !== "pendingSelfie") {
                    throw "unexpected";
                }

                const url = await uploadPicture(picture).catch((error) => {
                    throw common.prompt.CANNOT_UPLOAD_PICTURE_TO_STORAGE.withAdditionalData({
                        error,
                        where: "useBiometry",
                    });
                });
                let docUrl;
                if (firebaseData.documentType === "cnh") {
                    if ("CNH F" in firebaseData) docUrl = firebaseData["CNH F"].url;
                    if ("CNH FV" in firebaseData) docUrl = firebaseData["CNH FV"].url;
                }
                if (firebaseData.documentType === "rg") {
                    if ("RG F" in firebaseData) docUrl = firebaseData["RG F"].url;
                    if ("RG FV" in firebaseData) docUrl = firebaseData["RG FV"].url;
                }

                const docType = await nextCodeDocClassify(url);
                if (isV2.DocType(docType)) {
                    if (docType.data[0].classification.type !== "SELFIE" && docType.data.length === 1)
                        throw biometry.prompt.DOC_INSTEAD_SELFIE
                }
                
                const response = await nextCodeBiometry(docUrl, url, source.token);
                if (!is.Biometry(response))
                    throw biometry.prompt.UNRECOGNIZED_RESPONSE.withAdditionalData({ response, url });

                const validations = validator(firebaseData, response);
                processResults(response, url, validations);
                const status = approvalType(firebaseData.validations, validations);
                return { response, url, validations, status };
            } catch (err) {
                if (err.skipAttempt) {
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
                    throw err.withButtons([{
                        title: "Enviar novamente",
                        action: () => null
                    }]);
                } else {
                    throw err
                }
            }
        },
        [firebaseCard, uploadPicture, source],
    );
    return [cbk, state] as [typeof cbk, typeof state];
};
