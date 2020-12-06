import * as RG from "./RG";
import * as CNH from "./CNH";
import { UseFullOCR } from "../../main";
import { CreateFirebaseData } from "./types";

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

export const createFirebaseData: CreateFirebaseData = (oldData, result) => {
    const discriminated = UseFullOCR.discriminateResult(result);
    if ("docStatus" in oldData) {
        if (oldData.docStatus === "pendingRGF" && discriminated.type === "RGF") return creator.RGFeV(oldData, discriminated.result);
        if (oldData.docStatus === "pendingRGV" && discriminated.type === "RGV") return creator.RGFeV(oldData, discriminated.result);
        if (oldData.docStatus === "pendingCNHF" && discriminated.type === "CNHF") return creator.CNHFeV(oldData, discriminated.result);
    }
    return creator[discriminated.type](oldData, discriminated.result as any);
};
