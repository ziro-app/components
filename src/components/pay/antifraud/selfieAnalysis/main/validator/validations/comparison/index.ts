import { Validation } from "../types";
import { BiometryPromptMessage, prompt } from "ziro-messages/dist/src/catalogo/antifraude/biometry";

export type ComparisonReason = BiometryPromptMessage<"FAILED_COMPARISON">;

export const comparison: Validation.Function<never, ComparisonReason> = (_firebaseData, response) => {
    const { compared, success } = response;
    if (!success || !compared) return { passed: false, reason: prompt.FAILED_COMPARISON };
    return { passed: true };
};
