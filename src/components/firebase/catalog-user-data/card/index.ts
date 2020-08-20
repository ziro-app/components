import { useFirestore, useFirestoreCollection, useFirestoreDoc, ReactFireOptions } from "reactfire"
import { FirebaseCard } from "./types"

export { FirebaseCard }

export type FirebaseCardsRef = import("firebase").firestore.CollectionReference<Card.Generic>

export const useFirebaseCardsRef = (storeownerId: string) => {
    if(!storeownerId) throw new Error("useFirebaseCardsRef was called with no storeownerId")
    return useFirestore().collection("catalog-user-data").doc(storeownerId).collection("cards") as FirebaseCardsRef
}

export type FirebaseCards = import("firebase").firestore.QuerySnapshot<FirebaseCard.Generic>

export const useFirebaseCards = (storeownerId: string, options: ReactFireOptions<FirebaseCard.Generic[]> = {}) => {
    if(!storeownerId) throw new Error("useFirebaseCards was called with no storeownerId")
    return useFirestoreCollection<FirebaseCard.Generic>(useFirebaseCardsRef(storeownerId),options) as unknown as FirebaseCards
}

export const useFirebaseCardRef = (storeownerId: string, cardId: string) => {
    if(!storeownerId) throw new Error("useFirebaseCardRef was called with no storeownerId")
    if(!cardId) throw new Error("useFirebaseCardRef was called with no cardId")
    return useFirebaseCardsRef(storeownerId).doc(cardId)
}

export const useFirebaseCard = (storeownerId: string, cardId: string) => {
    if(!storeownerId) throw new Error("useFirebaseCard was called with no storeownerId")
    if(!cardId) throw new Error("useFirebaseCard was called with no cardId")
    return useFirestoreDoc(useFirebaseCard(storeownerId, cardId))
}

// interface UseFirebaseCardsProp {
//     storeownerId: string
// }

// export const useFirebaseCards = ({ storeownerId }: UseFirebaseCardsProp) => {
//     if(!storeownerId) return null
//     const collectionRef = useFirestore()
//         .collection("catalog-user-data")
//         .doc(storeownerId)
//         .collection("cards")

//     return useFirestoreCollection(collectionRef,{ idField: "id" }) as unknown as firebase.firestore.QuerySnapshot<Card.Generic>
// }

// interface UseFirebaseCardProp {
//     storeownerId: string
//     card_id: string
// }

// export const useFirebaseCard = ({ storeownerId, card_id }: UseFirebaseCardProp) => {
//     if(!storeownerId||!card_id) return null
//     const documentRef = useFirestore()
//         .collection("catalog-user-data")
//         .doc(storeownerId)
//         .collection("cards")
//         .doc(card_id)

//     return useFirestoreDoc<Card.Generic>(documentRef,{ idField: "id" })
// }