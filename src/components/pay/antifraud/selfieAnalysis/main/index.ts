import {
    FirebaseCardDocumentBeforeSelfiePhase,
    useUploadFirebaseCardPicture,
} from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { useCancelToken } from "@bit/vitorbarbosa19.ziro.utils.axios";
import { biometry as nextcode, is } from "@bit/vitorbarbosa19.ziro.pay.next-code";
import { usePromiseShowingMessage } from "@bit/vitorbarbosa19.ziro.utils.async-hooks";
import { biometry, common } from "ziro-messages/dist/src/catalogo/antifraude";
import { validator, processResults } from "./validator";
import { approvalType } from "./approvalType";

export const useBiometry = (firebaseCard: FirebaseCardDocumentBeforeSelfiePhase) => {
    const [uploadPicture] = useUploadFirebaseCardPicture(firebaseCard.id);
    const source = useCancelToken();
    const [cbk, state] = usePromiseShowingMessage(
        biometry.waiting.ANALYZING_FACE,
        async ({ picture }) => {
            if (!picture)
                throw { skipAttempt: true, error: common.prompt.NO_IMAGE.withAdditionalData({ where: "useBiometry" }) };
            if (state.attempts === 3)
                throw {
                    skipAttempt: true,
                    error: common.prompt.TOO_MANY_ATTEMPTS.withAdditionalData({ where: "useBiometry" }),
                };

            const url = await uploadPicture(picture).catch((error) => {
                throw common.prompt.CANNOT_UPLOAD_PICTURE_TO_STORAGE.withAdditionalData({ error });
            });
            const firebaseData = firebaseCard.data();
            let docUrl;
            if (firebaseData.documentType === "cnh") {
                if ("CNH F" in firebaseData) docUrl = firebaseData["CNH F"].url;
                if ("CNH FV" in firebaseData) docUrl = firebaseData["CNH FV"].url;
            }
            if (firebaseData.documentType === "rg") {
                if ("RG F" in firebaseData) docUrl = firebaseData["RG F"].url;
                if ("RG FV" in firebaseData) docUrl = firebaseData["RG FV"].url;
            }
            const response = await nextcode(docUrl, url, source.token);
            if (!is.Biometry(response))
                throw biometry.prompt.UNRECOGNIZED_RESPONSE.withAdditionalData({ response, url });

            const validations = validator(firebaseData, response);
            processResults(response, url, validations);
            const status = approvalType(firebaseData.validations, validations);
            return { response, url, validations, status };
        },
        [firebaseCard, uploadPicture, source],
    );
};
