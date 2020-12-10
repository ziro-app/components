import { Storeowner } from "./types";
import type firebase from "firebase";

export type StoreownerQuerySnapshot = firebase.firestore.QuerySnapshot<Omit<Storeowner, "storeownerId">>;
export type StoreownerQueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot<Omit<Storeowner, "storeownerId">>;
