import { FirebaseCard } from "./types"

export { FirebaseCard }
export type FirebaseCardsCollectionRef = import("firebase").firestore.CollectionReference<FirebaseCard.Generic>
export type FirebaseCardsCollection = import("firebase").firestore.QuerySnapshot<FirebaseCard.Generic>
export type FirebaseCardDocumentRef = import("firebase").firestore.DocumentReference<FirebaseCard.Generic>
export type FirebaseCardDocument = import("firebase").firestore.DocumentSnapshot<FirebaseCard.Generic>