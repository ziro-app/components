import { usePromiseShowingMessage } from "@bit/vitorbarbosa19.ziro.utils.async-hooks";
import { useMessagePromise } from "@bit/vitorbarbosa19.ziro.message-modal";
import { waiting, prompt } from "ziro-messages/dist/src/catalogo/pay/chooseCard";
import { deleteCard } from "@bit/vitorbarbosa19.ziro.pay.zoop";
import { useCancelToken } from "@bit/vitorbarbosa19.ziro.utils.axios";
import { useFirebaseCardsCollectionRef } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { useCallback, useMemo } from "react";

/**
 * Esse hook retorna um callback para excluir um cartão
 */
export const useDeleteCard = () => {
    const source = useCancelToken();
    const collectionRef = useFirebaseCardsCollectionRef();
    const setMessagePromise = useMessagePromise();
    const [cbk, state] = usePromiseShowingMessage<string, any, any>(
        waiting.DELETING_CARD,
        async (id) => {
            await deleteCard(id, source.token);
            await collectionRef
                .doc(id)
                .delete()
                .catch((error) => {
                    throw prompt.CANNOT_DELETE_FROM_FIRESTORE.withAdditionalData({ error });
                });
        },
        [collectionRef, deleteCard, prompt],
    );
    const newCbk = useCallback(
        (id: string) => {
            setMessagePromise(prompt.DELETE_CARD)
                .then(() => cbk(id))
                .catch(() => null);
        },
        [setMessagePromise, cbk, prompt],
    );

    const running = useMemo(() => state.status === "running", [state.status]);

    return [newCbk, running] as [typeof newCbk, typeof running];
};

export const useRegisterCard = () => {
    const source = useCancelToken();
};
