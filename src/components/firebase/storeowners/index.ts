import { useUser, useFirestore, useFirestoreCollectionData, useFirestoreCollection } from "reactfire"
import { Storeowner } from "./types"

const errorMsg = (hookName: string) =>
    `${hookName} was used in a public route, use privateOnly on this route to ensure there is a valid user`

type StoreownerQuerySnapshot = import("firebase").firestore.QuerySnapshot<Omit<Storeowner,"storeownerId">>

/**
 * Esse hook retorna o documento storeowner associado ao uid do usuário logado,
 * USE SOMENTE EM ROTAS PRIVADAS
 */
export const useStoreowner = () => {
    const user = useUser<import("firebase").User>()

    if(!user) throw new Error(errorMsg("useStoreowner"))

    const userQuery = useFirestore().collection('storeowners').where("uid","==",user.uid).limit(1)
    return useFirestoreCollectionData<Storeowner>(userQuery,{ idField: "storeownerId" })[0]
}

export const useStoreownerDocument = () => {
    const user = useUser<import("firebase").User>()

    if(!user) throw new Error(errorMsg("useStoreownerDocument"))

    const userQuery = useFirestore().collection('storeowners').where("uid","==",user.uid).limit(1)
    return (useFirestoreCollection(userQuery) as unknown as StoreownerQuerySnapshot).docs[0]

}