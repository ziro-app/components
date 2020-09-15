import { FirebaseCardDocument, FirebaseCard } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { UseFullOCR } from "../../main";
import { createFirebaseData } from "./createData";
import { SaveSuccessToFirestore, SaveFailureToFirestore } from "./types";

export const saveSuccessToFirestore: SaveSuccessToFirestore = async (card, result, FV) => {
    const resultData = UseFullOCR.transformResult(result);
    const oldData = card.data();
    if (oldData.status !== "pendingDocument") throw "UNEXPECTED_CARD_STATUS";
    const newData = {
        ...createFirebaseData(oldData, resultData),
        added: oldData.added,
        updated: FV.serverTimestamp(),
    };
    if (oldData.errors) newData.errors = oldData.errors;
    await card.ref.set(newData as any);
};

export const saveFailureToFirestore: SaveFailureToFirestore = async (card, error, FV) => {
    const errorData = {
        timestamp: FV.serverTimestamp(),
        error: error.getData(),
    };
    await card.ref.update({ errors: FV.arrayUnion(errorData) });
};
