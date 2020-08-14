import { useFirestore, useFirestoreCollection, useFirestoreDoc } from "reactfire"
import { Card } from "./types"

export { Card }

interface UseFirebaseCardsProp {
    storeownerId: string
}

export const useFirebaseCards = ({ storeownerId }: UseFirebaseCardsProp) => {
    if(!storeownerId) return null
    const collectionRef = useFirestore()
        .collection("catalog-user-data")
        .doc(storeownerId)
        .collection("cards")

    return useFirestoreCollection(collectionRef,{ idField: "id" }) as unknown as firebase.firestore.QuerySnapshot<Card.Generic>
}

interface UseFirebaseCardProp {
    storeownerId: string
    card_id: string
}

export const useFirebaseCard = ({ storeownerId, card_id }: UseFirebaseCardProp) => {
    if(!storeownerId||!card_id) return null
    const documentRef = useFirestore()
        .collection("catalog-user-data")
        .doc(storeownerId)
        .collection("cards")
        .doc(card_id)

    return useFirestoreDoc<Card.Generic>(documentRef,{ idField: "id" })
}