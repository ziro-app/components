import { Validation } from "../types";
import { BiometryPromptMessage, prompt } from "ziro-messages/dist/src/catalogo/antifraude/biometry";

export type IdenticalReason = BiometryPromptMessage<"NOT_IDENTICAL">;

export const identical: Validation.Function<never, IdenticalReason> = (_firebaseData, response) => {
    const { isIdentical } = response;
    if (!isIdentical) return { passed: false, reason: prompt.NOT_IDENTICAL };
    return { passed: true };
};
