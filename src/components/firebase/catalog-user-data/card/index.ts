import { useFirestore, useFirestoreCollection, useFirestoreDoc, useStorage } from "reactfire"
import cuid from "cuid"
import { useMountState } from "@bit/vitorbarbosa19.ziro.utils.async-hooks"
import { useStoreowner } from "@bit/vitorbarbosa19.ziro.firebase.storeowners"
import {
    FirebaseCardsCollectionRef,
    FirebaseCardsCollection,
    FirebaseCardDocument,
    FirebaseCard
} from "./hookTypes"
import { useState, useCallback, useEffect } from "react"

export * from "./hookTypes"

/**
 * Esse hook retorna uma CollectionReference que aponta para a collection "cards" do usuário do catalogo que estiver logado
 */
export const useFirebaseCardsRef = () => {
    const { storeownerId } = useStoreowner()
    return useFirestore()
        .collection("catalog-user-data")
        .doc(storeownerId)
        .collection("cards") as FirebaseCardsCollectionRef
}

/**
 * Esse hook retorna a collection "cards" do usuário do catalogo que estiver logado
 * @param startWithValue valor inicial, se for fornecido o hook não irá dar throw na promise (modo suspense)
 */
export const useFirebaseCards = (startWithValue?: FirebaseCard.Generic[]) => {
    return useFirestoreCollection(useFirebaseCardsRef(),{ startWithValue }) as unknown as FirebaseCardsCollection
}

/**
 * Esse hook retorna uma DocumentReference que aponta para o cartão com o id fornecido
 * @param cardId O id do cartão
 */
export const useFirebaseCardRef = (cardId: string) => {
    if(!cardId) throw new Error("useFirebaseCardRef was called with no cardId")
    return useFirebaseCardsRef().doc(cardId)
}

/**
 * Esse hook retorna o documento do cartão com o id fornecido
 * @param cardId O id do cartão
 * @param startWithValue valor inicial, se for fornecido o hook não irá dar throw na promise (modo suspense)
 */
export const useFirebaseCard = (cardId: string, startWithValue?: FirebaseCard.Generic) => {
    if(!cardId) throw new Error("useFirebaseCard was called with no cardId")
    return useFirestoreDoc(useFirebaseCardRef(cardId),{ startWithValue }) as unknown as FirebaseCardDocument
}

/**
 * Esse hook retorna um callback para upload de uma imagem em base64, assim como a task referente ao upload
 * @param cardId O id do cartão ao qual a imagem será vinculada
 */
export const useUploadFirebaseCardPicture = (cardId: string) => {
    if(!cardId) throw new Error("useUploadFirebaseCardPicture was called with no cardId")

    const [pic, setPic] = useState<string>(null)
    const [task, setTask] = useState<import("firebase").storage.UploadTask>(null)
    const [ref,setRef] = useState<import("firebase").storage.Reference>(null)
    const [url, setUrl] = useState<string>(null)
    const storage = useStorage()

    const mountState = useMountState()

    useEffect(() => () => task && task.cancel(),[task])

    const upload = useCallback(async (picture: string) => {
        if(picture===pic) return url
        setPic(picture)
        const newRef = storage.ref(`antifraude/${cardId}`).child(cuid())
        setRef(newRef)
        const uploadTask = newRef.putString(picture, "base64")
        setTask(uploadTask)
        const taskCompleted = await uploadTask
        const newUrl = await taskCompleted.ref.getDownloadURL()
        if(mountState.current==="mounted") setUrl(newUrl)
        return newUrl
    },[pic, setPic, task, setTask, ref, setRef, storage, cardId, url, setUrl])

    return [upload,task] as [typeof upload,typeof task]
}