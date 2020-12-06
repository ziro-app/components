import { FirebaseCard } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { FullOCR } from "@bit/vitorbarbosa19.ziro.pay.next-code";
import { UseFullOCR } from "../../main";

//OmittedAttributes
type OmittedAttributes = "added" | "updated" | "error";
//Aliases
type OldData = FirebaseCard.BeforeDocPhase | FirebaseCard.BeforeSelfiePhase;
type Known = FullOCR.Response.KnownDocument;
//Types
type CreatedData<R extends Known> = R extends FullOCR.Response.CNHF
    ? FirebaseCard.CNHF
    : R extends FullOCR.Response.CNHV
    ? FirebaseCard.CNHV
    : R extends FullOCR.Response.CNHFV
    ? FirebaseCard.CNHFV
    : R extends FullOCR.Response.RGF
    ? FirebaseCard.RGF
    : R extends FullOCR.Response.RGV
    ? FirebaseCard.RGV
    : R extends FullOCR.Response.RGFV
    ? FirebaseCard.RGFV
    : never;
type DataCreator<R extends Known, O = Omit<OldData, OmittedAttributes>, D = CreatedData<R>> = (
    old: O,
    response: UseFullOCR.DataResult<R>,
) => Omit<D, OmittedAttributes>;

export namespace CNH {
    export type Frente = DataCreator<FullOCR.Response.CNHF>;
    export type Verso = DataCreator<FullOCR.Response.CNHV>;
    export type FrenteVerso = DataCreator<FullOCR.Response.CNHFV>;
    export type FrenteMaisVerso = DataCreator<FullOCR.Response.CNHF, Omit<FirebaseCard.CNHV, OmittedAttributes>, FirebaseCard.CNHFeV>;
}

export namespace RG {
    export type Frente = DataCreator<FullOCR.Response.RGF>;
    export type Verso = DataCreator<FullOCR.Response.RGV>;
    export type FrenteVerso = DataCreator<FullOCR.Response.RGFV>;
    export type FrenteMaisVerso = DataCreator<
        FullOCR.Response.RGF | FullOCR.Response.RGV,
        Omit<FirebaseCard.RGV, OmittedAttributes> | Omit<FirebaseCard.RGF, OmittedAttributes>,
        FirebaseCard.RGFeV
    >;
}

export type CreateFirebaseData = (old: OldData, result: UseFullOCR.DataResult) => Omit<FirebaseCard.Generic, "added" | "updated">;
