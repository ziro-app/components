import { FullOCRPromptMessage, FullOCRPromptCollection } from "ziro-messages/dist/src/catalogo/antifraude/fullOCR"
import { FullOCR } from "@bit/vitorbarbosa19.ziro.pay.next-code"
import { messagesThatShouldThrow } from "./processResults"
import { ValidationsErrorReasons } from "./validations"

/**
 * Tipos utilitários
 */
type WithResponseAndURL<D> = D&{ response: FullOCR.Response.KnownDocument, url: string }
type FullOCRPromptMessageWithResponseAndURL<N extends keyof FullOCRPromptCollection,D> = FullOCRPromptMessage<N,WithResponseAndURL<D>>
type SelectMessagesWithResponseAndURL<Messages,Selected> = Messages extends FullOCRPromptMessage<infer N,infer D> ?
    N extends Selected ? FullOCRPromptMessageWithResponseAndURL<N,D> : never : never

/**
 * Os tipos de mensagem que irão dar throw com a resposta e a url inclusas nos dados
 */
type MessagesThatShouldThrow = (typeof messagesThatShouldThrow)[number]
export type ReasonsThatShouldThrow = SelectMessagesWithResponseAndURL<ValidationsErrorReasons,MessagesThatShouldThrow>