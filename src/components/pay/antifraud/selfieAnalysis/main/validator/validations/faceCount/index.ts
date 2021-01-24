import { Validation } from "../types";
import { BiometryPromptMessage, prompt } from "ziro-messages/dist/src/catalogo/antifraude/biometry";
import * as common from "ziro-messages/dist/src/catalogo/antifraude/common";
import { Biometry } from "@bit/vitorbarbosa19.ziro.pay.next-code";

export type FaceCountReason =
    | common.CommonPromptMessage<"MISSING_EXTRACTED_DATA">
    | BiometryPromptMessage<"DOC_TOO_MANY_FACES", { faceCount: Biometry.Response["faceCount"] }>
    | BiometryPromptMessage<"DOC_NO_FACE", { faceCount: Biometry.Response["faceCount"] }>
    | BiometryPromptMessage<"SELFIE_TOO_MANY_FACES", { faceCount: Biometry.Response["faceCount"] }>
    | BiometryPromptMessage<"SELFIE_NO_FACE", { faceCount: Biometry.Response["faceCount"] }>;

export const faceCount: Validation.Function<never, FaceCountReason> = (_firebaseData, response) => {
    const { faceCount } = response || {};
    if (!faceCount || typeof faceCount.img1 !== "number" || typeof faceCount.img2 !== "number") {
        return { passed: false, reason: common.prompt.MISSING_EXTRACTED_DATA };
    }
    if (faceCount.img1 > 1) {
        return { passed: false, reason: prompt.DOC_TOO_MANY_FACES.withAdditionalData({ faceCount }) };
    }
    if (faceCount.img1 < 1) {
        return { passed: false, reason: prompt.DOC_NO_FACE.withAdditionalData({ faceCount }) };
    }
    if (faceCount.img2 > 1) {
        return { passed: false, reason: prompt.SELFIE_TOO_MANY_FACES.withAdditionalData({ faceCount }) };
    }
    if (faceCount.img2 < 1) {
        return { passed: false, reason: prompt.SELFIE_NO_FACE.withAdditionalData({ faceCount }) };
    }
    return { passed: true };
};
