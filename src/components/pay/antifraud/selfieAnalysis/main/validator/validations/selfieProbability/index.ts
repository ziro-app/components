import { Validation } from "../types";
import { BiometryPromptMessage, prompt } from "ziro-messages/dist/src/catalogo/antifraude/biometry";

export type SelfieProbabilityReason =
    | BiometryPromptMessage<"CONFIDENCE_UNDER_60", { confidence: number }>
    | BiometryPromptMessage<"CONFIDENCE_UNDER_90", { confidence: number }>;

export const selfieProbability: Validation.Function<never, SelfieProbabilityReason> = (_firebaseData, response) => {
    const { confidence } = response;
    if (confidence < 0.6)
        return { passed: false, reason: prompt.CONFIDENCE_UNDER_60.withAdditionalData({ confidence }) };
    if (confidence < 0.9)
        return { passed: false, reason: prompt.CONFIDENCE_UNDER_90.withAdditionalData({ confidence }) };
    return { passed: true };
};
