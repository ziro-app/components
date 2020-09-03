import { useFirestore, useFirestoreDoc, useFirestoreDocData } from "reactfire";
import { useStoreowner } from "@bit/vitorbarbosa19.ziro.firebase.storeowners";
import { CatalogUserDataDocumentRef, CatalogUserDataDocument, CatalogUserData } from "./types";

export * from "./types";

export const useCatalogUserDataRef = () => {
    const { storeownerId } = useStoreowner();
    return useFirestore().collection("catalog-user-data").doc(storeownerId) as CatalogUserDataDocumentRef;
};

export const useCatalogUserDataDocument = <T = CatalogUserDataDocument>(startWithValue?: T) => {
    return useFirestoreDoc(useCatalogUserDataRef(), { startWithValue }) as CatalogUserDataDocument | T;
};

export const useCatalogUserDataDocumentData = <T = CatalogUserData>(startWithValue?: T) => {
    return useFirestoreDocData(useCatalogUserDataRef(), { startWithValue }) as CatalogUserData | T;
};
