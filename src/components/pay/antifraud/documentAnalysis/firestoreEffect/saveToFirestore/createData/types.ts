import { FirebaseCard } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { FullOCR } from "@bit/vitorbarbosa19.ziro.pay.next-code";
import { UseFullOCR } from "../../../main";

/**
 * Aliases
 */
import Response = FullOCR.Response;

type OmittedAttributes = "added" | "updated" | "error";
type CreatedData<R extends Response.KnownDocument> = R extends Response.CNHF
    ? FirebaseCard.CNHF
    : R extends Response.CNHV
    ? FirebaseCard.CNHV
    : R extends Response.CNHFV
    ? FirebaseCard.CNHFV
    : R extends Response.RGF
    ? FirebaseCard.RGF
    : R extends Response.RGV
    ? FirebaseCard.RGV
    : R extends Response.RGFV
    ? FirebaseCard.RGFV
    : never;
type DataCreator<
    R extends Response.KnownDocument,
    O = Omit<FirebaseCard.BeforeDocPhase, OmittedAttributes>,
    D = CreatedData<R>
> = (old: O, response: UseFullOCR.DataResult<R>) => Omit<D, OmittedAttributes>;

export namespace CNH {
    export type Frente = DataCreator<Response.CNHF>;
    export type Verso = DataCreator<Response.CNHV>;
    export type FrenteVerso = DataCreator<Response.CNHFV>;
    export type FrenteMaisVerso = DataCreator<
        Response.CNHF,
        Omit<FirebaseCard.CNHV, OmittedAttributes>,
        FirebaseCard.CNHFeV
    >;
}

export namespace RG {
    export type Frente = DataCreator<Response.RGF>;
    export type Verso = DataCreator<Response.RGV>;
    export type FrenteVerso = DataCreator<Response.RGFV>;
    export type FrenteMaisVerso = DataCreator<
        Response.RGF | Response.RGV,
        Omit<FirebaseCard.RGV, OmittedAttributes> | Omit<FirebaseCard.RGF, OmittedAttributes>,
        FirebaseCard.RGFeV
    >;
}

export type CreateFirebaseData = (
    old: FirebaseCard.BeforeDocPhase,
    result: UseFullOCR.DataResult,
) => Omit<FirebaseCard.Generic, "added" | "updated">;
