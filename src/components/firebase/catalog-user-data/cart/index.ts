import { useStoreowner } from "@bit/vitorbarbosa19.ziro.firebase.storeowners"
import { useFirestore, useFirestoreCollection, useFirestoreDoc } from "reactfire"
import {
    CartCollectionRef,
    CartCollection,
    CartItemDocument
} from "./hookTypes"

export * from "./hookTypes"

/**
 * Esse hook retorna uma CollectionReference para a collection cart do usuário logado
 */
export const useCartCollectionRef = () => {
    const { storeownerId } = useStoreowner()
    return useFirestore()
        .collection(" catalog-user-data")
        .doc(storeownerId)
        .collection("cart") as CartCollectionRef
}

/**
 * Esse hook retorna a collection cart do usuário logado
 * @param startWithValue caso seja fornecido o hook não dará throw na promise (modo suspense)
 */
export const useCartCollection = <T = CartCollection>(startWithValue?: T) => {
    return useFirestoreCollection(useCartCollectionRef(),{ startWithValue: (startWithValue as any) }) as unknown as CartCollection|T
}

/**
 * Esse hook retorna uma DocumentReference para o documento referente ao cartId
 * @param cartId o cartId do documento desejado
 */
export const useCartItemDocumentRef = (cartId: string) => {
    if(!cartId) throw new Error("useCartItemDocumentRef was called with no cartId")
    return useCartCollectionRef().doc(cartId)
}

/**
 * Esse hook retorna o documento referente ao cartId
 * @param cartId o cartId do documento desejado
 * @param startWithValue caso seja fornecido o hook não dará throw na promise (modo suspense)
 */
export const useCartItemDocument = <T = CartItemDocument>(cartId: string,startWithValue?: T) => {
    return useFirestoreDoc(useCartItemDocumentRef(cartId),{ startWithValue }) as CartItemDocument|T
}