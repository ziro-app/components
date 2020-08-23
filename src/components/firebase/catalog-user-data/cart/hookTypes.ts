import { firestore } from "firebase";
import { CartItem } from "./types";

export { CartItem };
export type CartCollectionRef = firestore.CollectionReference<CartItem>;
export type CartCollection = firestore.QuerySnapshot<CartItem>;
export type CartItemDocumentRef = firestore.DocumentReference<CartItem>;
export type CartItemDocument = firestore.DocumentSnapshot<CartItem>;
