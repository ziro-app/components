import { Validation } from "../types";
import { BiometryPromptMessage, prompt } from "ziro-messages/dist/src/catalogo/antifraude/biometry";
import * as common from "ziro-messages/dist/src/catalogo/antifraude/common";

export type IdenticalReason = BiometryPromptMessage<"NOT_IDENTICAL"> | common.CommonPromptMessage<"MISSING_EXTRACTED_DATA">;

export const identical: Validation.Function<never, IdenticalReason> = (_firebaseData, response) => {
    if (!response || !("isIdentical" in response)) return { passed: false, reason: common.prompt.MISSING_EXTRACTED_DATA };
    const { isIdentical } = response;
    if (!isIdentical) return { passed: false, reason: prompt.NOT_IDENTICAL };
    return { passed: true };
};
