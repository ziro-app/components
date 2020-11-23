import { useAsyncEffectShowingMessage } from "@bit/vitorbarbosa19.ziro.utils.async-hooks";
import { UseFullOCR } from "../main";
import { saveFailureToFirestore, saveSuccessToFirestore } from "./saveToFirestore";
import { FirebaseCardDocument, useCatalogUserDataDocument } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { useFirestore } from "reactfire";
import { common } from "ziro-messages/dist/src/catalogo/antifraude";
import { UseFirestoreEffect } from "./types";

export type { UseFirestoreEffect };

export const useFirestoreEffect = (firebaseCard: FirebaseCardDocument, state: UseFullOCR.State) => {
    const FV = useFirestore.FieldValue;
    const userData = useCatalogUserDataDocument();
    return useAsyncEffectShowingMessage<void, UseFirestoreEffect.Error>(
        null,
        async () => {
            switch (state.status) {
                case "failed":
                    await saveFailureToFirestore(firebaseCard, state.error, FV).catch((firestoreError) => {
                        throw common.prompt.CANNOT_SAVE_TO_FIRESTORE.withAdditionalData({
                            firestoreError,
                            fullOCRError: state.error.getData(),
                        });
                    });
                    return;
                case "success":
                    await saveSuccessToFirestore(firebaseCard, state.result, FV)
                        .then(() => {
                            if (userData.data().status !== "paid") return userData.ref.update({ status: "docAdded" });
                        })
                        .catch((firestoreError) => {
                            throw common.prompt.CANNOT_SAVE_TO_FIRESTORE.withAdditionalData({
                                firestoreError,
                                fullOCRResult: UseFullOCR.transformResult(state.result),
                            });
                        });
                    return;
                default:
                    return;
            }
        },
        [state.status],
    );
};
