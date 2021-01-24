import { FirebaseCardDocument } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { biometry as nextCodeBiometry, is } from "@bit/vitorbarbosa19.ziro.pay.next-code";
import { docClassify, is as isV2 } from "@bit/vitorbarbosa19.ziro.pay.next-code-v2";
import { biometry as bio, common } from "ziro-messages/dist/src/catalogo/antifraude";
import { isPrompt } from "ziro-messages";
import { validator, processResults } from "./validator";
import { approvalType } from "./approvalType";
import { UseBiometry } from "./types";
import { ZoopCard } from "@bit/vitorbarbosa19.ziro.pay.zoop";
import { CancelTokenSource } from "axios";

export * from "./types";

interface Args extends UseBiometry.Argument {
    uploadPicture: (picture: string) => Promise<string>;
    source: CancelTokenSource;
    fbCard: FirebaseCardDocument;
    zoopCard: ZoopCard;
}

export const biometry = async ({ picture, fbCard, uploadPicture, source }: Args) => {
    if (!picture) throw common.prompt.NO_IMAGE.withAdditionalData({ where: "useBiometry" });
    const firebaseData = fbCard.data();
    if (firebaseData.status !== "pendingSelfie") throw bio.prompt.UNEXPECTED_CARD_STATUS;
    const url = await uploadPicture(picture).catch((error) => {
        throw common.prompt.CANNOT_UPLOAD_PICTURE_TO_STORAGE.withAdditionalData({
            error,
            where: "biometry",
        });
    });
    let docUrl: string | undefined;
    if (firebaseData.documentType === "cnh") {
        if ("CNH F" in firebaseData) docUrl = firebaseData["CNH F"].url;
        if ("CNH FV" in firebaseData) docUrl = firebaseData["CNH FV"].url;
    }
    if (firebaseData.documentType === "rg") {
        if ("RG F" in firebaseData) docUrl = firebaseData["RG F"].url;
        if ("RG FV" in firebaseData) docUrl = firebaseData["RG FV"].url;
    }

    const docType = await docClassify(url, source.token);
    if (isV2.DocType(docType) && docType.data.length === 1) {
        if (docType.data[0].classification.type !== "SELFIE") throw bio.prompt.DOC_INSTEAD_SELFIE;
    }

    const response = await nextCodeBiometry(docUrl, url, source.token);
    if (!is.Biometry(response)) throw bio.prompt.UNRECOGNIZED_RESPONSE.withAdditionalData({ response, url });

    const validations = validator(firebaseData, response);
    processResults(response, url, validations);
    const status = approvalType(firebaseData.validations, validations);
    return { response, url, validations, status };
};
