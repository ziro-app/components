import { Document } from "@bit/vitorbarbosa19.ziro.pay.next-code";
import { ValidatorResult, ThrownMessages, PM, Response } from "./validations"

type UnknownDocumentError = PM<"UNKNOWN_DOCUMENT_TYPE",{ response: Document.Response.UnknownDocument, url: string }>
type SelfieError = PM<"SELFIE_TYPE",{ response: Document.Response.Selfie, url: string }>
type UnrecognizedResponseError = PM<"UNRECOGNIZED_RESPONSE",{ response: any, url: string }>
type NoImageError = PM<"NO_IMAGE",{ where: string }>
type TooManyAttemptsError = PM<"TOO_MANY_ATTEMPTS",{ where: string }>

export type A = { picture: string };
export type R = { validation: ValidatorResult, response: Response, url: string }
export type E = ThrownMessages|UnknownDocumentError|SelfieError|UnrecognizedResponseError|NoImageError|TooManyAttemptsError