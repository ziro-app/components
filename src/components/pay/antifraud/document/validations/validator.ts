import { Response, ValidationResults } from "./types"
import { expDate } from "./validateExpDate"
import { face } from "./validateFace"
import { name } from "./validateName"

const isDev = process.env.NODE_ENV === "development"

//an object with validations to be run against the nextcode response
const validations = { face, expDate, name }
export type Validations = typeof validations

//the validator will run validations with the nextcode response, and exclude those that doesnt apply
export function validator(card: any, response: Response): ValidationResults<Validations> {
    const results = Object
        .entries(validations)
        .reduce((acc,[key,validation]) => {
            const result = validation(card, response)
            if(result.passed==="dontApply") return acc
            else return { ...acc, [key]: result }
        },{} as ValidationResults<Validations>)
    if(isDev) console.log('validation results',results)
    return results
}

export type Validator = typeof validator
export type ValidatorResult = ReturnType<Validator>