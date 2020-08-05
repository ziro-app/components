import { is } from "@bit/vitorbarbosa19.ziro.pay.next-code"
import { Validation, PM } from "./types"
import antifraudMatchNames from '../../antifraude/antifraudMatchNames/index'
import { prompt } from "ziro-messages/dist/src/catalogo/antifraude"

//possible ZiroMessage types that this validation can return with their respective data type
type R = PM<"FIRST_NAME_MISMATCH"|"LAST_NAME_MISMATCH",{ holder_name: string, docName: string }>

export const name: Validation<R> = ({ holder_name }, response) => {
    //if the document type is RG frente or CNH verso, this validation doens't apply
    if(is.RG.Frente(response)||is.CNH.Verso(response)) return { passed: "dontApply" }
    //if the document is background checked, we can take the name found on gov servers, because it is more reliable
    const docName = is.BackgroundCheck(response) ? response.found.name : response.extracted.nome
    //try to match names
    const [matchFirstName, matchLastName] = antifraudMatchNames(holder_name, docName)
    //if the first name doesnt match we will throw the error because it is not the holder document
    if(!matchFirstName) return { passed: false, reason: prompt.FIRST_NAME_MISMATCH.withAdditionalData({ holder_name, docName }) }
    //if the last name doesnt match we will send to manual approval, because it could be a spouse name
    if(!matchLastName) return { passed: false, reason: prompt.LAST_NAME_MISMATCH.withAdditionalData({ holder_name, docName }) }
    return { passed: true }
}