import { FirebaseCard } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { UseBiometry } from "../main";

type OldData = Omit<FirebaseCard.BeforeSelfiePhase, "added" | "updated">;
type NewData = Omit<FirebaseCard.AfterAntifraud, "added" | "updated">;
type CreateFirebaseData = (o: OldData, r: UseBiometry.DataResult) => NewData;

export const createFirebaseData: CreateFirebaseData = (oldData, { url, validations, status }) => {
    return {
        ...oldData,
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
};
