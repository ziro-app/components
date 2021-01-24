import { Validation } from "../types";
import { BiometryPromptMessage, prompt } from "ziro-messages/dist/src/catalogo/antifraude/biometry";
import * as common from "ziro-messages/dist/src/catalogo/antifraude/common";

export type SelfieProbabilityReason =
    | common.CommonPromptMessage<"MISSING_EXTRACTED_DATA">
    | BiometryPromptMessage<"CONFIDENCE_UNDER_60", { confidence: number }>
    | BiometryPromptMessage<"CONFIDENCE_UNDER_90", { confidence: number }>;

export const selfieProbability: Validation.Function<never, SelfieProbabilityReason> = (_firebaseData, response) => {
    if (!response || !("confidence" in response)) return { passed: false, reason: common.prompt.MISSING_EXTRACTED_DATA };
    const { confidence } = response;
    if (confidence < 0.6) return { passed: false, reason: prompt.CONFIDENCE_UNDER_60.withAdditionalData({ confidence }) };
    if (confidence < 0.9) return { passed: false, reason: prompt.CONFIDENCE_UNDER_90.withAdditionalData({ confidence }) };
    return { passed: true };
};
