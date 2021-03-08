import { useFirestore, useFirestoreDoc, useFirestoreDocData } from "reactfire";
import { useStoreowner } from "@bit/vitorbarbosa19.ziro.firebase.storeowners";
import { CatalogUserDataDocumentRef, CatalogUserDataDocument, CatalogUserData } from "./types";

export * from "./types";

export const useCatalogUserDataRef = () => {
    const { storeownerId } = useStoreowner();
    return useFirestore()
        .collection(storeownerId === "-" ? "catalog-images" : "catalog-user-data")
        .doc(storeownerId) as CatalogUserDataDocumentRef;
};

export const useCatalogUserDataDocument = <T = CatalogUserDataDocument>(startWithValue?: T): CatalogUserDataDocument | T => {
    const ref = useCatalogUserDataRef();
    const options: any = { startWithValue };
    return useFirestoreDoc(ref, options).data as any;
};

export const useCatalogUserDataDocumentData = <T = CatalogUserData>(startWithValue?: T): CatalogUserData | T => {
    const ref = useCatalogUserDataRef();
    const options: any = { startWithValue };
    return useFirestoreDocData(ref, options).data as any;
};
