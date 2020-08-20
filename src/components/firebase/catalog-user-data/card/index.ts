import { useFirestore, useFirestoreCollection, useFirestoreDoc } from "reactfire"
import { useStoreowner } from "@bit/vitorbarbosa19.ziro.firebase.storeowners"
import {
    FirebaseCardsCollectionRef,
    FirebaseCardsCollection,
    FirebaseCardDocument,
    FirebaseCard
} from "./hookTypes"

export * from "./hookTypes"

/**
 * Esse hook retorna uma CollectionReference que aponta para a collection "cards" do usuário do catalogo que estiver logado
 */
export const useFirebaseCardsRef = () => {
    const { storeownerId } = useStoreowner()
    return useFirestore()
        .collection("catalog-user-data")
        .doc(storeownerId)
        .collection("cards") as FirebaseCardsCollectionRef
}

/**
 * Esse hook retorn a collection "cards" do usuário do catalogo que estive logado
 * @param startWithValue valor inicial, se for fornecido o hook não irá dar throw na promise (modo suspense)
 */
export const useFirebaseCards = (startWithValue?: FirebaseCard.Generic[]) => {
    return useFirestoreCollection(useFirebaseCardsRef(),{ startWithValue }) as unknown as FirebaseCardsCollection
}

/**
 * Esse hook retorna uma DocumentReference que aponta para o cartão com o id fornecido
 * @param cardId O id do cartão
 */
export const useFirebaseCardRef = (cardId: string) => {
    if(!cardId) throw new Error("useFirebaseCardRef was called with no cardId")
    return useFirebaseCardsRef().doc(cardId)
}

/**
 * Esse hook retorna o documento do cartão com o id fornecido
 * @param cardId O id do cartão
 * @param startWithValue valor inicial, se for fornecido o hook não irá dar throw na promise (modo suspense)
 */
export const useFirebaseCard = (cardId: string, startWithValue?: FirebaseCard.Generic) => {
    if(!cardId) throw new Error("useFirebaseCard was called with no cardId")
    return useFirestoreDoc(useFirebaseCardRef(cardId),{ startWithValue }) as unknown as FirebaseCardDocument
}