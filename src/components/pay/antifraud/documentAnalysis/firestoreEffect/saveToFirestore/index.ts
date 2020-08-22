import { FirebaseCardDocument } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { UseFullOCR } from "../../main"
import { createFirebaseData } from "./createData"


export async function saveSuccessToFirestore(
    firebaseCard: FirebaseCardDocument,
    result: UseFullOCR.ClassResult,
    FV: typeof import("firebase").firestore.FieldValue
) {
    const resultData = UseFullOCR.transformResult(result)
    const { added, ...oldData } = firebaseCard.data()
    const newData = {
        ...createFirebaseData(oldData,resultData,FV.delete),
        added,
        updated: FV.serverTimestamp()
    }
    await firebaseCard.ref.set(newData as any)
}

export async function saveFailureToFirestore(
    firebaseCard: FirebaseCardDocument,
    error: UseFullOCR.Errors.Generic,
    FV: typeof import("firebase").firestore.FieldValue
) {
    const errorData = error.getData()
    const newData = {
        ...firebaseCard.data(),
        error: errorData,
        updated: FV.serverTimestamp()
    }
    await firebaseCard.ref.set(newData as any)
}