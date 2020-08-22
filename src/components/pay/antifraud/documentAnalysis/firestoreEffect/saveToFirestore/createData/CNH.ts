import { FirebaseCard } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data"
import { is, FullOCR } from "@bit/vitorbarbosa19.ziro.pay.next-code"
import { UseFullOCR } from "../../../main"

export function Frente(
    _: Omit<FirebaseCard.Generic,"added"|"updated">,
    { response: { fileInfo, extracted, fieldScores, face, ...response }, url, validations }: UseFullOCR.DataResult<FullOCR.Response.CNHF>,
    exclude: () => any,
): Omit<FirebaseCard.CNHF,"added"|"updated"> {
    return {
        //common
        status: "pendingSelfie",
        //CNHF
        documentType: "cnh",
        extracted,
        face: face as FullOCR.Face.Success,
        fieldScores: fieldScores||exclude(),
        found: is.BackgroundCheck(response) ? response.found : exclude(),
        passedOn: is.BackgroundCheck(response) ? response.passedOn : exclude(),
        validations: validations as any,
        "CNH F": { url, fileInfo }
    }
}

export function Verso(
    _: Omit<FirebaseCard.Generic,"added"|"updated">,
    { response: { fileInfo }, url }: UseFullOCR.DataResult<FullOCR.Response.CNHV>,
    exclude: () => any,
): Omit<FirebaseCard.CNHV,"added"|"updated"> {
    return {
        //common
        status: "pendingDocument",
        //CNHV
        documentType: "cnh",
        docStatus: "pendingCNHF",
        "CNH V": { url, fileInfo }
    }
}

export function FrenteVerso(
    _: Omit<FirebaseCard.Generic,"added"|"updated">,
    { response: { fileInfo, extracted, fieldScores, face, ...response }, url, validations }: UseFullOCR.DataResult<FullOCR.Response.CNHFV>,
    exclude: () => any,
): Omit<FirebaseCard.CNHFV,"added"|"updated"> {
    return {
        //common
        status: "pendingSelfie",
        //CNHFV
        documentType: "cnh",
        extracted,
        face: face as FullOCR.Face.Success,
        fieldScores: fieldScores||exclude(),
        found: is.BackgroundCheck(response) ? response.found : exclude(),
        passedOn: is.BackgroundCheck(response) ? response.passedOn : exclude(),
        validations: validations as any,
        "CNH FV": { url, fileInfo }
    }
}

export function FrenteMaisVerso(
    { ["CNH V"]: cnhv }: Omit<FirebaseCard.CNHV,"added"|"updated">,
    { response: { fileInfo, extracted, fieldScores, face, ...response }, url, validations }: UseFullOCR.DataResult<FullOCR.Response.CNHF>,
    exclude: () => any,
): Omit<FirebaseCard.CNHFeV,"added"|"updated"> {
    return {
        //common
        status: "pendingSelfie",
        //CNHFV
        documentType: "cnh",
        extracted,
        face: face as FullOCR.Face.Success,
        fieldScores: fieldScores||exclude(),
        found: is.BackgroundCheck(response) ? response.found : exclude(),
        passedOn: is.BackgroundCheck(response) ? response.passedOn : exclude(),
        validations: validations as any,
        "CNH V": cnhv,
        "CNH F": { url, fileInfo }
    }
}