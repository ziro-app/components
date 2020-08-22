import { CartItem } from "./types"

export { CartItem }
export type CartCollectionRef = import("firebase").firestore.CollectionReference<CartItem>
export type CartCollection = import("firebase").firestore.QuerySnapshot<CartItem>
export type CartItemDocumentRef = import("firebase").firestore.DocumentReference<CartItem>
export type CartItemDocument = import("firebase").firestore.DocumentSnapshot<CartItem>