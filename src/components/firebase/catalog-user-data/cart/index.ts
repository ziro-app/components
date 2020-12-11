import { useStoreowner } from "@bit/vitorbarbosa19.ziro.firebase.storeowners";
import { useFirestore, useFirestoreCollection, useFirestoreDoc, useFirestoreCollectionData, useFirestoreDocData } from "reactfire";
import { CartCollectionRef, CartCollection, CartItemDocument, CartItem } from "./hookTypes";

export * from "./hookTypes";

/**
 * Esse hook retorna uma CollectionReference para a collection cart do usuário logado
 */
export const useCartCollectionRef = () => {
    const { storeownerId } = useStoreowner();
    return useFirestore().collection(" catalog-user-data").doc(storeownerId).collection("cart") as CartCollectionRef;
};

/**
 * Esse hook retorna a collection cart do usuário logado
 * @param startWithValue caso seja fornecido o hook não dará throw na promise (modo suspense)
 */
export const useCartCollection = <T = CartCollection>(startWithValue?: T): CartCollection | T => {
    const ref = useCartCollectionRef();
    const options: any = { startWithValue };
    return useFirestoreCollection(ref, options).data as any;
};

/**
 * Esse hook retorna os dados da collection cart do usuário logado
 * @param startWithValue caso seja fornecido o hook não dará throw na promise (modo suspense)
 */
export const useCardCollectionData = <T = CartItem[]>(startWithValue?: T): CartItem[] | T => {
    const ref = useCartCollectionRef();
    const options: any = { startWithValue };
    return useFirestoreCollectionData(ref, options).data as any;
};

/**
 * Esse hook retorna uma DocumentReference para o documento referente ao cartId
 * @param cartId o cartId do documento desejado
 */
export const useCartItemDocumentRef = (cartId: string) => {
    if (!cartId) throw new Error("useCartItemDocumentRef was called with no cartId");
    return useCartCollectionRef().doc(cartId);
};

/**
 * Esse hook retorna o documento referente ao cartId
 * @param cartId o cartId do documento desejado
 * @param startWithValue caso seja fornecido o hook não dará throw na promise (modo suspense)
 */
export const useCartItemDocument = <T = CartItemDocument>(cartId?: string, startWithValue?: T): CartItemDocument | T => {
    const ref = useCartItemDocumentRef(cartId || "-");
    const options: any = { startWithValue };
    const hookResult: any = useFirestoreDoc(ref, options).data;
    return cartId ? hookResult : startWithValue;
};

/**
 * Esse hook retorna os dados do documento referente ao cartId
 * @param cartId o cartId do documento desejado
 * @param startWithValue caso seja fornecido o hook não dará throw na promise (modo suspense)
 */
export const useCartItemDocumentData = <T = CartItem>(cartId?: string, startWithValue?: T): CartItem | T => {
    const ref = useCartItemDocumentRef(cartId || "-");
    const options: any = { startWithValue };
    const hookResult: any = useFirestoreDocData(ref, options).data;
    return cartId ? hookResult : startWithValue;
};
