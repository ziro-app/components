import { FirebaseCard } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data"
import * as RG from "./RG"
import * as CNH from "./CNH"
import { UseFullOCR } from "../../../main"

export function createFirebaseData(
    oldData: Omit<FirebaseCard.Generic,"added"|"updated">,
    result: UseFullOCR.DataResult,
    exclude: () => any
): Omit<FirebaseCard.Generic,"added"|"updated"> {
    if(oldData.status!=="pendingDocument") throw "UNEXPECTED_CARD_STATUS"
    const discriminated = UseFullOCR.discriminateResult(result)
    switch(discriminated.type) {
        case "RGFV" : return RG.FrenteVerso(oldData,discriminated.result, exclude)
        case "CNHV" : return CNH.Verso(oldData,discriminated.result, exclude)
        case "CNHFV": return CNH.FrenteVerso(oldData,discriminated.result, exclude)
        case "RGF": {
            if(!("docStatus" in oldData)||(oldData as any).docStatus!=="pendingRGF") return RG.Frente(oldData, discriminated.result, exclude)
            return RG.FrenteMaisVerso(oldData, discriminated.result, exclude)
        }
        case "RGV": {
            if(!("docStatus" in oldData)||(oldData as any).docStatus!=="pendingRGV") return RG.Verso(oldData, discriminated.result, exclude)
            return RG.FrenteMaisVerso(oldData, discriminated.result, exclude)
        }
        case "CNHF": {
            if(!("docStatus" in oldData)||(oldData as any).docStatus!=="pendingCNHF") return CNH.Frente(oldData, discriminated.result, exclude)
            return CNH.FrenteMaisVerso(oldData, discriminated.result, exclude)
        }
    }
}