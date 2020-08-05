import { is } from "@bit/vitorbarbosa19.ziro.pay.next-code"
import { Validation, PM } from "./types"
import { prompt } from "ziro-messages/dist/src/catalogo/antifraude"

//get date in ms from a date string formatted as dd/MM/YYYY
function dateFromString(str: string): number {
    const [day,month,year] = str.split("/").map(parseInt)
    return new Date(year, month-1, day).getTime()
}

//get date in ms from a threshold in years back from now
function dateFromThreshold(years: number): number {
    const today = new Date()
    return today.setFullYear(today.getFullYear()-years)
}

//possible ZiroMessage types that this validation can return with their respective data type
type R = PM<"MISSING_EXP_DATE",{}>|PM<"EXPIRED_DOC",{ threshold: number }>

export const expDate: Validation<R> = (_, response) => {
    //if doc is CNH verso or RG frente, this validation doenst apply
    if(is.CNH.Verso(response)||is.RG.Frente(response)) return { passed: 'dontApply' }
    //different documents have different names for the same field
    const exp = is.RG(response) ? response.extracted.dataExpedicao : response.extracted.dataEmissao
    //nextcode always return the field, if thay can't extract it, they will return an empty string
    if(exp==="") return { passed: false, reason: prompt.MISSING_EXP_DATE }
    //the threshold with which we will consider the document expired
    const threshold = 10
    if(dateFromString(exp) < dateFromThreshold(threshold))
        return { passed: false, reason: prompt.EXPIRED_DOC.withAdditionalData({ threshold }) }
    return { passed: true }
}