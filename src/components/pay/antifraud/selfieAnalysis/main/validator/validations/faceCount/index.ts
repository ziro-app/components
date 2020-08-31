import { Validation } from "../types";
import { BiometryPromptMessage, prompt } from "ziro-messages/dist/src/catalogo/antifraude/biometry";
import { Biometry } from "components/pay/NextCode/types";

export type FaceCountReason =
    | BiometryPromptMessage<"DOC_TOO_MANY_FACES", { faceCount: Biometry.Response["faceCount"] }>
    | BiometryPromptMessage<"DOC_NO_FACE", { faceCount: Biometry.Response["faceCount"] }>
    | BiometryPromptMessage<"SELFIE_TOO_MANY_FACES", { faceCount: Biometry.Response["faceCount"] }>
    | BiometryPromptMessage<"SELFIE_NO_FACE", { faceCount: Biometry.Response["faceCount"] }>;

export const faceCount: Validation.Function<never, FaceCountReason> = (_firebaseData, response) => {
    const { faceCount } = response;
    if (faceCount.img1 > 1)
        return { passed: false, reason: prompt.DOC_TOO_MANY_FACES.withAdditionalData({ faceCount }) };
    if (faceCount.img1 < 1) return { passed: false, reason: prompt.DOC_NO_FACE.withAdditionalData({ faceCount }) };
    if (faceCount.img2 > 1)
        return { passed: false, reason: prompt.SELFIE_TOO_MANY_FACES.withAdditionalData({ faceCount }) };
    if (faceCount.img2 < 1) return { passed: false, reason: prompt.SELFIE_NO_FACE.withAdditionalData({ faceCount }) };
    return { passed: true };
};
