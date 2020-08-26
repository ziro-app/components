import { usePromiseShowingMessage } from "@bit/vitorbarbosa19.ziro.utils.async-hooks";
import { useCancelToken } from "@bit/vitorbarbosa19.ziro.utils.axios";
import {
    useUploadFirebaseCardPicture,
    FirebaseCardDocument,
} from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { fullOCR, common } from "ziro-messages/dist/src/catalogo/antifraude";
import { analiseDocument, is } from "@bit/vitorbarbosa19.ziro.pay.next-code";
import { ZoopCard } from "@bit/vitorbarbosa19.ziro.pay.zoop";
import devCheck from "./devCheck";
import { validator, processResults } from "./validator";
import { UseFullOCR } from "./types";

const isDev = process.env.NODE_ENV === "development";

export * from "./types";

export const useFullOCR = (firebaseCard: FirebaseCardDocument, zoopCardData: ZoopCard) => {
    const [uploadPicture] = useUploadFirebaseCardPicture(firebaseCard.id);
    const source = useCancelToken();
    const [analise, state] = usePromiseShowingMessage<
        UseFullOCR.Argument,
        UseFullOCR.ClassResult,
        UseFullOCR.Errors.Generic
    >(
        fullOCR.waiting.ANALYZING_DOC,
        async ({ picture }) => {
            await new Promise((resolve) => setTimeout(resolve, 10));
            if (!picture)
                throw { skipAttempt: true, error: common.prompt.NO_IMAGE.withAdditionalData({ where: "useFullOCR" }) };
            if (state.attempts === 3)
                throw {
                    skipAttempt: true,
                    error: common.prompt.TOO_MANY_ATTEMPTS.withAdditionalData({ where: "useFullOCR" }),
                };

            const url = await uploadPicture(picture).catch((error) => {
                throw common.prompt.CANNOT_UPLOAD_PICTURE_TO_STORAGE.withAdditionalData({ error });
            });
            const response = await analiseDocument(url, source.token);

            if (isDev) devCheck(response);

            if (!is.Response(response))
                throw fullOCR.prompt.UNRECOGNIZED_RESPONSE.withAdditionalData({ response, url });
            if (is.Response.Selfie(response)) throw fullOCR.prompt.SELFIE_TYPE.withAdditionalData({ response, url });
            if (is.Response.UnknownDocument(response))
                throw fullOCR.prompt.UNKNOWN_DOCUMENT_TYPE.withAdditionalData({ response, url });

            const validations = validator(firebaseCard.data(), zoopCardData, response);
            processResults(response, url, validations);
            return { response, url, validations };
        },
        [firebaseCard, zoopCardData, uploadPicture, source],
    );
    return [analise, state] as [typeof analise, typeof state];
};
