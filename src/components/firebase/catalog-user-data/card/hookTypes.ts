import { firestore } from "firebase";
import { FirebaseCard } from "./types";

export { FirebaseCard };
export type FirebaseCardsCollectionRef = firestore.CollectionReference<FirebaseCard.Generic>;
export type FirebaseCardsCollection = firestore.QuerySnapshot<FirebaseCard.Generic>;
export type FirebaseCardDocumentRef = firestore.DocumentReference<FirebaseCard.Generic>;
export type FirebaseCardDocument = firestore.DocumentSnapshot<FirebaseCard.Generic>;
