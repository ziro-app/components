import {
    useFirestore,
    useFirestoreCollection,
    useFirestoreDoc,
    useFirestoreCollectionData,
    useFirestoreDocData,
    useStorage,
} from "reactfire";
import cuid from "cuid";
import { useStoreowner } from "@bit/vitorbarbosa19.ziro.firebase.storeowners";
import { FirebaseCardsCollectionRef, FirebaseCardsCollection, FirebaseCardDocument, FirebaseCard } from "./hookTypes";
import { useState, useCallback, useEffect, useRef } from "react";

export * from "./hookTypes";

/**
 * Esse hook retorna uma CollectionReference que aponta para a collection "cards" do usuário do catalogo que estiver logado
 */
export const useFirebaseCardsCollectionRef = () => {
    const { storeownerId } = useStoreowner();
    return useFirestore()
        .collection("catalog-user-data")
        .doc(storeownerId)
        .collection("cards") as FirebaseCardsCollectionRef;
};

/**
 * Esse hook retorna a collection "cards" do usuário do catalogo que estiver logado
 * @param startWithValue valor inicial, se for fornecido o hook não irá dar throw na promise (modo suspense)
 */
export const useFirebaseCardsCollection = <T = FirebaseCardsCollection>(startWithValue?: T) => {
    return (useFirestoreCollection(useFirebaseCardsCollectionRef(), {
        startWithValue: startWithValue as any,
    }) as unknown) as FirebaseCardsCollection | T;
};

/**
 * Esse hook retorna os dados da collection "cards" do usuário do catalogo que estiver logado
 * @param startWithValue valor inicial, se for fornecido o hook não irá dar throw na promise (modo suspense)
 */
export const useFirebaseCardsCollectionData = <T = FirebaseCard.Generic[]>(startWithValue?: T) => {
    return useFirestoreCollectionData(useFirebaseCardsCollectionRef(), { startWithValue: startWithValue as any }) as
        | FirebaseCard.Generic[]
        | T;
};

/**
 * Esse hook retorna uma DocumentReference que aponta para o cartão com o id fornecido
 * @param cardId O id do cartão
 */
export const useFirebaseCardDocumentRef = (cardId: string) => {
    if (!cardId) throw new Error("useFirebaseCardDocumentRef was called with no cardId");
    return useFirebaseCardsCollectionRef().doc(cardId);
};

/**
 * Esse hook retorna o documento do cartão com o id fornecido
 * @param cardId O id do cartão
 * @param startWithValue valor inicial, se for fornecido o hook não irá dar throw na promise (modo suspense)
 */
export const useFirebaseCardDocument = <T = FirebaseCardDocument>(cardId?: string, startWithValue?: T) => {
    const hookResult = useFirestoreDoc(useFirebaseCardDocumentRef(cardId || "-"), { startWithValue }) as
        | FirebaseCardDocument
        | T;
    return cardId ? hookResult : startWithValue;
};

/**
 * Esse hook retorna os dados do documento do cartão com o id fornecido
 * @param cardId O id do cartão
 * @param startWithValue valor inicial, se for fornecido o hook não irá dar throw na promise (modo suspense)
 */
export const useFirebaseCardDocumentData = <T = FirebaseCard.Generic>(cardId?: string, startWithValue?: T) => {
    const hookResult = useFirestoreDocData(useFirebaseCardDocumentRef(cardId || "-"), { startWithValue }) as
        | FirebaseCard.Generic
        | T;
    return cardId ? hookResult : startWithValue;
};

/**
 * Esse hook retorna um callback para upload de uma imagem em base64, assim como a task referente ao upload
 * @param cardId O id do cartão ao qual a imagem será vinculada
 */
export const useUploadFirebaseCardPicture = (cardId: string) => {
    if (!cardId) throw new Error("useUploadFirebaseCardPicture was called with no cardId");

    const pic = useRef<string>(null);
    const url = useRef<string>(null);

    const [task, setTask] = useState<firebase.storage.UploadTask>(null);

    const storage = useStorage();

    useEffect(() => () => task && task.cancel(), [task]);

    const upload = useCallback(
        async (picture: string) => {
            let taskCompleted: firebase.storage.UploadTaskSnapshot;
            if (picture === pic.current && url.current) return url.current;
            if (picture === pic.current && task) taskCompleted = await task;
            else {
                task?.cancel();
                pic.current = picture;
                url.current = null;
                const uploadTask = storage.ref(`antifraude/${cardId}`).child(cuid()).putString(picture, "data_url");
                setTask(uploadTask);
                taskCompleted = await uploadTask;
            }
            const newUrl = await taskCompleted.ref.getDownloadURL();
            url.current = newUrl;
            return newUrl as string;
        },
        [pic, task, setTask, storage, cardId, url],
    );

    return [upload, task] as [typeof upload, typeof task];
};
