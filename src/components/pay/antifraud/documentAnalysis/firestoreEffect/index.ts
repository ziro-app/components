import { useAsyncEffectShowingMessage } from "@bit/vitorbarbosa19.ziro.utils.async-hooks";
import { UseFullOCR } from "../main"
import { saveFailureToFirestore, saveSuccessToFirestore } from "./saveToFirestore";
import { FirebaseCardDocument } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { useFirestore } from "reactfire";
import { common } from "ziro-messages/dist/src/catalogo/antifraude"
import { UseFirestoreEffect } from "./types"

export { UseFirestoreEffect }

export const useFirestoreEffect = (
    firebaseCard: FirebaseCardDocument,
    state: UseFullOCR.State
) => {
    const FV = useFirestore.FieldValue
    return useAsyncEffectShowingMessage<void,UseFirestoreEffect.Error>(null, async () => {
      switch(state.status) {
        case "failed":
          await saveFailureToFirestore(firebaseCard, state.error, FV)
          .catch((error) => { throw common.prompt.CANNOT_SAVE_TO_FIRESTORE.withAdditionalData({ error, ...state.error.additionalData }) })
          return
        case "success":
          await saveSuccessToFirestore(firebaseCard, state.result, FV)
          .catch((error) => { throw common.prompt.CANNOT_SAVE_TO_FIRESTORE.withAdditionalData({ error, ...state.result }) })
          return
        default:
          return
      }
    },[state.status])
}