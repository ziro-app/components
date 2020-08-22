import { FirebaseCard } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data"
import { is, FullOCR } from "@bit/vitorbarbosa19.ziro.pay.next-code"
import { UseFullOCR } from "../../../main"

export function Frente(
    _: Omit<FirebaseCard.Generic,"added"|"updated">,
    { url, response: { fileInfo, face }, validations }: UseFullOCR.DataResult<FullOCR.Response.RGF>,
    exclude: () => any,
): Omit<FirebaseCard.RGF,"added"|"updated"> {
    return {
        //common
        status: "pendingDocument",
        //RGF
        docStatus: "pendingRGV",
        documentType: "rg",
        face: face as FullOCR.Face.Success,
        validations: validations as any,
        "RG F": { url, fileInfo }
    }
}

export function Verso(
    _: Omit<FirebaseCard.Generic,"added"|"updated">,
    { url, response: { fileInfo, extracted, fieldScores, ...response }, validations }: UseFullOCR.DataResult<FullOCR.Response.RGV>,
    exclude: () => any,
): Omit<FirebaseCard.RGV,"added"|"updated"> {
    return {
        //common
        status: "pendingDocument",
        //RGV
        docStatus: "pendingRGF",
        documentType: "rg",
        extracted,
        fieldScores: fieldScores||exclude(),
        found: is.BackgroundCheck(response) ? response.found : exclude(),
        passedOn: is.BackgroundCheck(response) ? response.passedOn : exclude(),
        validations: validations as any,
        "RG V": { url, fileInfo }
    }
}

export function FrenteVerso(
    _: Omit<FirebaseCard.Generic,"added"|"updated">,
    { url, response: { fileInfo, extracted, fieldScores, face, ...response }, validations }: UseFullOCR.DataResult<FullOCR.Response.RGFV>,
    exclude: () => any,
): Omit<FirebaseCard.RGFV,"added"|"updated"> {
    return {
        //common
        status: "pendingSelfie",
        //RGFV
        documentType: "rg",
        extracted,
        fieldScores: fieldScores||exclude(),
        found: is.BackgroundCheck(response) ? response.found : exclude(),
        passedOn: is.BackgroundCheck(response) ? response.passedOn : exclude(),
        face: face as FullOCR.Face.Success,
        validations: validations as any,
        "RG FV": { url, fileInfo }
    }
}

export function FrenteMaisVerso(
    fbData: Omit<FirebaseCard.RGF,"added"|"updated">|Omit<FirebaseCard.RGV,"added"|"updated">,
    { url, response: { fileInfo, ...response }, validations }: UseFullOCR.DataResult<FullOCR.Response.RGF|FullOCR.Response.RGV>,
    exclude: () => any,
): Omit<FirebaseCard.RGFeV,"added"|"updated"> {
    return {
        //common
        status: "pendingSelfie",
        //RGFeV
        documentType: "rg",
        extracted: ("extracted" in response) ? response.extracted : ("extracted" in fbData) ? fbData.extracted : exclude(),
        fieldScores: ("fieldScores" in response) ? response.fieldScores : ("fieldScores" in fbData) ? fbData.fieldScores : exclude(),
        face: ("face" in response) ? response.face : ("face" in fbData) ? fbData.face as any : exclude(),
        found: is.BackgroundCheck(response) ? response.found : is.BackgroundCheck(fbData) ? fbData.found : exclude(),
        passedOn: is.BackgroundCheck(response) ? response.passedOn : is.BackgroundCheck(fbData) ? fbData.passedOn : exclude(),
        validations: { ...fbData.validations, ...validations } as any,
        "RG F": ("RG F" in fbData) ? fbData["RG F"] : (fileInfo.classifiedAs.tagName==="RG F") ? { url, fileInfo } as any : exclude(),
        "RG V": ("RG V" in fbData) ? fbData["RG V"] : (fileInfo.classifiedAs.tagName==="RG V") ? { url, fileInfo } as any : exclude(),
    }
}