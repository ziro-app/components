import { firestore } from "firebase";
import { Storeowner } from "./types";

export type StoreownerQuerySnapshot = firestore.QuerySnapshot<Omit<Storeowner, "storeownerId">>;
export type StoreownerQueryDocumentSnapshot = firestore.QueryDocumentSnapshot<Omit<Storeowner, "storeownerId">>;
