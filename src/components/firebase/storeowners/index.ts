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
export const useStoreowner = <T = Storeowner>(startWithValue?: T) => {
    const user = useUser<firebase.User>();
    const userQuery = useFirestore()
        .collection("storeowners")
        .where("uid", "==", user?.uid || "-")
        .limit(1);
    return (useFirestoreCollectionData<Storeowner>(userQuery, {
        idField: "storeownerId",
        startWithValue: startWithValue ? ([startWithValue] as any) : undefined,
    })[0] || defaultStoreowner) as Storeowner | T;
};

/**
 * Esse hook retorna o documento storeowner associado ao uid do usuario logado
 */
export const useStoreownerDocument = () => {
    const user = useUser<firebase.User>();
    const userQuery = useFirestore()
        .collection("storeowners")
        .where("uid", "==", user?.uid || "-")
        .limit(1);
    return ((useFirestoreCollection(userQuery) as unknown) as StoreownerQuerySnapshot).docs[0];
};
