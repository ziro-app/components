import { CreditCardPayments } from "./types";
import type firebase from "firebase";

export type { CreditCardPayments };
export type CreditCardPaymentsCollectionRef = firebase.firestore.CollectionReference<CreditCardPayments.FirebaseDocument>;
export type CreditCardPaymentsCollection = firebase.firestore.QuerySnapshot<CreditCardPayments.FirebaseDocument>;
export type CreditCardPaymentDocumentRef = firebase.firestore.DocumentReference<CreditCardPayments.FirebaseDocument>;
export type CreditCardPaymentDocument = firebase.firestore.DocumentSnapshot<CreditCardPayments.FirebaseDocument>;
