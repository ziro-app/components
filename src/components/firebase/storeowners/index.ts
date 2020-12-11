import { useUser, useFirestore, useFirestoreCollectionData, useFirestoreCollection } from "reactfire";
import { Storeowner } from "./types";
import { StoreownerQuerySnapshot } from "./hookTypes";
import type firebase from "firebase";

export * from "./types";
export * from "./hookTypes";

const defaultStoreowner = {
    storeownerId: "-",
} as Storeowner;

/**
 * Esse hook retorna os dados do documento storeowner associado ao uid do usuário logado
 */
export const useStoreowner = <T = Storeowner>(startWithValue?: T): Storeowner | T => {
    const user = useUser<firebase.User>().data;
    const userQuery = useFirestore()
        .collection("storeowners")
        .where("uid", "==", user?.uid || "-")
        .limit(1);
    const options: any = { idField: "storeownerId", startWithValue };
    const hookResult: any[] = useFirestoreCollectionData(userQuery, options).data;
    return user?.uid ? hookResult[0] : defaultStoreowner;
};

/**
 * Esse hook retorna o documento storeowner associado ao uid do usuario logado
 */
export const useStoreownerDocument = () => {
    const user = useUser<firebase.User>().data;
    const userQuery = useFirestore()
        .collection("storeowners")
        .where("uid", "==", user?.uid || "-")
        .limit(1);
    const hookResult: StoreownerQuerySnapshot = useFirestoreCollection(userQuery).data as any;
    return hookResult.docs[0];
};
