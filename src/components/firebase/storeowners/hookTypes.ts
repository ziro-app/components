import { Storeowner } from "./types"

export type StoreownerQuerySnapshot = import("firebase").firestore.QuerySnapshot<Omit<Storeowner,"storeownerId">>
export type StoreownerQueryDocumentSnapshot = import("firebase").firestore.QueryDocumentSnapshot<Omit<Storeowner,"storeownerId">>