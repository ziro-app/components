import { FirebaseCard } from "./types";
import type firebase from "firebase";

export type { FirebaseCard };
export type FirebaseCardsCollectionRef = firebase.firestore.CollectionReference<FirebaseCard.Generic>;
export type FirebaseCardsCollection = firebase.firestore.QuerySnapshot<FirebaseCard.Generic>;
export type FirebaseCardDocumentRef = firebase.firestore.DocumentReference<FirebaseCard.Generic>;
export type FirebaseCardDocument = firebase.firestore.DocumentSnapshot<FirebaseCard.Generic>;
export type FirebaseCardDocumentBeforeDocPhase = firebase.firestore.DocumentSnapshot<FirebaseCard.BeforeDocPhase>;
export type FirebaseCardDocumentBeforeSelfiePhase = firebase.firestore.DocumentSnapshot<FirebaseCard.BeforeSelfiePhase>;
