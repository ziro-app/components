import { FirebaseCard } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import * as RG from "./RG";
import * as CNH from "./CNH";
import { UseFullOCR } from "../../../main";

const creator = {
    RGF: RG.Frente,
    RGV: RG.Verso,
    RGFV: RG.FrenteVerso,
    RGFeV: RG.FrenteMaisVerso,
    CNHF: CNH.Frente,
    CNHV: CNH.Verso,
    CNHFV: CNH.FrenteVerso,
    CNHFeV: CNH.FrenteMaisVerso,
};

export function createFirebaseData(
    oldData: FirebaseCard.Generic,
    result: UseFullOCR.DataResult,
): Omit<FirebaseCard.Generic, "added" | "updated"> {
    if (oldData.status !== "pendingDocument") throw "UNEXPECTED_CARD_STATUS";
    const discriminated = UseFullOCR.discriminateResult(result);
    if ("docStatus" in oldData) {
        if (oldData.documentType === "rg" && (discriminated.type === "RGF" || discriminated.type === "RGV"))
            return creator.RGFeV(oldData, discriminated.result);
        if (oldData.documentType === "cnh" && discriminated.type === "CNHF")
            return creator.CNHFeV(oldData, discriminated.result);
    }
    return creator[discriminated.type](oldData, discriminated.result as any);
}
