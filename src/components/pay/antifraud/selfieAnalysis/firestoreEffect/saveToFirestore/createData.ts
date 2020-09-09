import { FirebaseCard } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { UseBiometry } from "../../main";

export function createFirebaseData(
    oldData: Omit<FirebaseCard.BeforeSelfiePhase, "added" | "updated">,
    { url, validations, status }: UseBiometry.DataResult,
    exclude: () => any,
): Omit<FirebaseCard.AfterAntifraud, "added" | "updated"> {
    return {
        ...oldData,
        error: exclude(),
        status,
        selfie: { url },
        validations: {
            ...oldData.validations,
            comparison: validations.comparison,
            faceCount: validations.faceCount,
            identical: validations.identical,
            selfieProbability: validations.selfieProbability,
        },
    };
}
