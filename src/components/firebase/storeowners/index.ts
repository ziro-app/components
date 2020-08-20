import { useUser, useFirestore, useFirestoreCollectionData } from "reactfire"
import { Storeowner } from "./types"

/**
 * Esse hook retorna o documento storeowner associado ao uid do usuário logado,
 * USE SOMENTE EM ROTAS PRIVADAS
 */
export const useStoreowner = () => {
    const user = useUser<import("firebase").User>()

    if(!user) throw new Error("useStoreowner was used in a public route, use privateOnly on this route to ensure there is a valid user")

    const userQuery = useFirestore().collection('storeowners').where("uid","==",user.uid).limit(1)
    return useFirestoreCollectionData<Storeowner>(userQuery,{ idField: "storeownerId" })[0]
}