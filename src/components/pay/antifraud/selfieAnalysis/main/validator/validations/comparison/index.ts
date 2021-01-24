import { Validation } from "../types";
import { BiometryPromptMessage, prompt } from "ziro-messages/dist/src/catalogo/antifraude/biometry";
import * as common from "ziro-messages/dist/src/catalogo/antifraude/common";

export type ComparisonReason = BiometryPromptMessage<"FAILED_COMPARISON"> | common.CommonPromptMessage<"MISSING_EXTRACTED_DATA">;

export const comparison: Validation.Function<never, ComparisonReason> = (_firebaseData, response) => {
    if (!response) return { passed: false, reason: common.prompt.MISSING_EXTRACTED_DATA };
    if (!("compared" in response) || !("success" in response)) return { passed: false, reason: common.prompt.MISSING_EXTRACTED_DATA };
    const { compared, success } = response;
    if (!success || !compared) return { passed: false, reason: prompt.FAILED_COMPARISON };
    return { passed: true };
};
