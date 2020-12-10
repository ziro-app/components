import { CartItem } from "./types";
import type firebase from "firebase";

export type { CartItem };
export type CartCollectionRef = firebase.firestore.CollectionReference<CartItem>;
export type CartCollection = firebase.firestore.QuerySnapshot<CartItem>;
export type CartItemDocumentRef = firebase.firestore.DocumentReference<CartItem>;
export type CartItemDocument = firebase.firestore.DocumentSnapshot<CartItem>;
