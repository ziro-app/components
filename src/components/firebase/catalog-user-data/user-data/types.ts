import type firebase from "firebase";
export interface CatalogUserData {
    cnpj: string;
    razao: string;
    status: "logged" | "cardAdded" | "docAdded" | "selfieAdded" | "paid";
}

export type CatalogUserDataDocumentRef = firebase.firestore.DocumentReference<CatalogUserData>;
export type CatalogUserDataDocument = firebase.firestore.DocumentSnapshot<CatalogUserData>;
