import { ValidatorResult, Validations } from "./validator"
import { MessagesType, WithResponse, Response, ThrowMessages } from "./types"

//All Possible Messages
type Messages = MessagesType<Validations,ValidatorResult>
//String union type with messages that will throw
type MessagesThatWillThrow = "CANNOT_ANALYZE_FACE"|"NO_FACE_OBJECT"|"FIRST_NAME_MISMATCH"
//Messages that will throw with response field added
export type ThrownMessages = WithResponse<ThrowMessages<Messages,MessagesThatWillThrow>>

//choose which message will throw and which will pass
export const processResult = (response: Response, url: string, results: ValidatorResult) => {
    if(results.expDate?.passed===false) {
        switch(results.expDate.reason.name) {
            case "EXPIRED_DOC":
                break
            case "MISSING_EXP_DATE":
                break
        }
    }
    if(results.face?.passed===false) {
        switch(results.face.reason.name) {
            case "UNRECOGNIZED_FACE_OBJECT":
                break
            case "CANNOT_ANALYZE_FACE":
                throw results.face.reason.withAdditionalData({ response, url })
            case "NO_FACE_OBJECT":
                throw results.face.reason.withAdditionalData({ response, url })
        }
    }
    if(results.name?.passed===false) {
        switch(results.name.reason.name) {
            case "LAST_NAME_MISMATCH":
                break
            case "FIRST_NAME_MISMATCH":
                throw results.name.reason.withAdditionalData({ response, url })
        }
    }
}