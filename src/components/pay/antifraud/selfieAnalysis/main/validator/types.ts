import { ZiroPromptMessage } from "ziro-messages";
import { BiometryPromptCollection, BiometryPromptMessage } from "ziro-messages/dist/src/catalogo/antifraude/biometry";
import { Biometry } from "@bit/vitorbarbosa19.ziro.pay.next-code";
import { messagesThatShouldThrow } from "./processResults";
import { ValidationsErrorReasons } from "./validations";

/**
 * Tipos utilitários
 */
type WithResponseAndURL<D> = D & { response: Biometry.Response; url: string };
type BiometryPromptMessageWithResponseAndURL<N extends keyof BiometryPromptCollection, D> = BiometryPromptMessage<
    N,
    WithResponseAndURL<D>
>;
type SelectMessagesWithResponseAndURL<Messages, Selected> = Messages extends ZiroPromptMessage<
    infer C,
    infer N,
    infer D
>
    ? C extends Selected
        ? N extends keyof BiometryPromptCollection
            ? BiometryPromptMessageWithResponseAndURL<N, D>
            : never
        : never
    : never;

/**
 * Os tipos de mensagem que irão dar throw com a resposta e a url inclusas nos dados
 */
type MessagesThatShouldThrow = typeof messagesThatShouldThrow[number];
export type ReasonsThatShouldThrow = SelectMessagesWithResponseAndURL<ValidationsErrorReasons, MessagesThatShouldThrow>;
