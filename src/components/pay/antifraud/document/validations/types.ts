import { Document } from "@bit/vitorbarbosa19.ziro.pay.next-code"
import { Card } from "../../ziro_pay/ThirdParty/Zoop/types"
import { ZiroPromptMessage } from "ziro-messages"
import { prompt } from "ziro-messages/dist/src/catalogo/antifraude"

export type Response = Document.Response.KnownDocument

//[A]ntifraude [E]rrors
type AE = typeof prompt
//[A]ntifraude [K]eys
type AK = keyof AE
//[Get C]ode from [N]ame
type GetC<N extends AK> = AE[N] extends ZiroPromptMessage<infer C,N,any> ? C : never

//[P]rompt [M]essage from [N]ame and [D]ata
export type PM<N extends AK,D> = ZiroPromptMessage<GetC<N>,N,D>
//Possible Results from Validation
export type ValidationNeutral = { passed: "dontApply" }
export type ValidationSuccess = { passed: true }
export type ValidationFail<R> = { passed: false, reason: R }
export type ValidationPartialResult<R> = ValidationNeutral|ValidationFail<R>|ValidationSuccess
export type ValidationResult<R> = ValidationFail<R>|ValidationSuccess

export type Validation<R> = (card: Card.Info, response: Response) => ValidationPartialResult<R>
export type ValidationResults<V> = {
    [K in keyof V]?: V[K] extends Validation<infer R> ?  ValidationResult<R> : never
}

//MessageTypes from [V]alidations with [V]alidator [R]esults
export type MessagesType<V,VR extends ValidationResults<V>> = VR[keyof V] extends ValidationResult<infer R> ? R : never
//Messages with added response field with type R to data type
export type WithResponse<M,R = Response> = M extends PM<infer N,infer D> ? PM<N,D&{ response: R, url: string }> : never
//Select messages using string union type
export type ThrowMessages<M,AM> = M extends PM<infer N,infer D> ? N extends AM ? PM<N,D> : never : never