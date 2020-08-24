import { firestore } from "firebase";
import { CreditCardPayments } from "./types";

export { CreditCardPayments };
export type CreditCardPaymentsCollectionRef = firestore.CollectionReference<CreditCardPayments.FirebaseDocument>;
export type CreditCardPaymentsCollection = firestore.QuerySnapshot<CreditCardPayments.FirebaseDocument>;
export type CreditCardPaymentDocumentRef = firestore.DocumentReference<CreditCardPayments.FirebaseDocument>;
export type CreditCardPaymentDocument = firestore.DocumentSnapshot<CreditCardPayments.FirebaseDocument>;
