import { FirebaseCardDocument } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { UseBiometry } from "../../main";
import { createFirebaseData } from "./createData";

export async function saveSuccessToFirestore(
    firebaseCard: FirebaseCardDocument,
    result: UseBiometry.ClassResult,
    FV: typeof import("firebase").firestore.FieldValue,
) {
    const resultData = UseBiometry.transformResult(result);
    const oldData = firebaseCard.data();
    if (oldData.status !== "pendingSelfie") throw "UNEXPECTED_CARD_STATUS";
    const newData = {
        ...createFirebaseData(oldData, resultData, FV.delete),
        added: oldData.added,
        updated: FV.serverTimestamp(),
    };
    await firebaseCard.ref.set(newData as any);
}

export async function saveFailureToFirestore(
    firebaseCard: FirebaseCardDocument,
    error: UseBiometry.Errors.Generic,
    FV: typeof import("firebase").firestore.FieldValue,
) {
    const errorData = error.getData();
    const newData = {
        ...firebaseCard.data(),
        error: errorData,
        updated: FV.serverTimestamp(),
    };
    await firebaseCard.ref.set(newData as any);
}
