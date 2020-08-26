import { usePromiseShowingMessage } from "@bit/vitorbarbosa19.ziro.utils.async-hooks";
import { useMessagePromise } from "@bit/vitorbarbosa19.ziro.message-modal";
import { waiting, prompt } from "ziro-messages/dist/src/catalogo/pay/chooseCard";
import { deleteCard } from "@bit/vitorbarbosa19.ziro.pay.zoop";
import { useCancelToken } from "@bit/vitorbarbosa19.ziro.utils.axios";
import { useFirebaseCardsCollection } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { useCallback } from "react";

/**
 * Esse hook retorna um callback para excluir um cartão
 */
export const useDeleteCard = () => {
    const source = useCancelToken();
    const cards = useFirebaseCardsCollection();
    const setMessagePromise = useMessagePromise();
    const cardDoc = useCallback((id: string) => cards.docs.find((doc) => doc.id === id), [cards]);
    const [cbk, state] = usePromiseShowingMessage<string, any, any>(
        waiting.DELETING_CARD,
        async (id) => {
            const card = cardDoc(id);
            if (!card) return;
            await deleteCard(id, source.token);
            await card.ref.delete().catch((error) => {
                throw prompt.CANNOT_DELETE_FROM_FIRESTORE.withAdditionalData({ error });
            });
        },
        [cardDoc, deleteCard, prompt],
    );
    return useCallback(
        (id: string) => {
            setMessagePromise(prompt.DELETE_CARD)
                .then(() => cbk(id))
                .catch(() => null);
        },
        [setMessagePromise, cbk, prompt],
    );
};
