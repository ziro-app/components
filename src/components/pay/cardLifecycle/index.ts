import { usePromiseShowingMessage } from "@bit/vitorbarbosa19.ziro.utils.async-hooks";
import { useMessagePromise } from "@bit/vitorbarbosa19.ziro.message-modal";
import * as delMessages from "ziro-messages/dist/src/catalogo/pay/chooseCard";
import * as regMessages from "ziro-messages/dist/src/catalogo/antifraude/registerCard";
import { deleteCard, createPayment, UnregisteredCard } from "@bit/vitorbarbosa19.ziro.pay.zoop";
import { useCancelToken } from "@bit/vitorbarbosa19.ziro.utils.axios";
import { useFirebaseCardsCollectionRef } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { useCallback, useMemo } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { useStoreowner } from "@bit/vitorbarbosa19.ziro.firebase.storeowners";

/**
 * Esse hook retorna um callback para excluir um cartão
 */
export const useDeleteCard = () => {
    const source = useCancelToken();
    const collectionRef = useFirebaseCardsCollectionRef();
    const setMessagePromise = useMessagePromise();
    const [cbk, state] = usePromiseShowingMessage<string, any, any>(
        delMessages.waiting.DELETING_CARD,
        async (id) => {
            await deleteCard(id, source.token);
            await collectionRef
                .doc(id)
                .delete()
                .catch((error) => {
                    throw delMessages.prompt.CANNOT_DELETE_FROM_FIRESTORE.withAdditionalData({ error });
                });
        },
        [collectionRef, deleteCard, delMessages],
    );
    const newCbk = useCallback(
        (id: string) => {
            setMessagePromise(delMessages.prompt.DELETE_CARD)
                .then(() => cbk(id))
                .catch(() => null);
        },
        [setMessagePromise, cbk, delMessages],
    );

    const running = useMemo(() => state.status === "running", [state.status]);

    return [newCbk, running] as [typeof newCbk, typeof running];
};

export const useRegisterCard = () => {
    const source = useCancelToken();
    const collectionRef = useFirebaseCardsCollectionRef();
    const query = useFirestore().collection("suppliers").where("fantasia", "==", "ZIRO");
    const [supplier] = useFirestoreCollectionData<{ zoopId: string }>(query);
    const storeowner = useStoreowner();
    const [cbk, state] = usePromiseShowingMessage<UnregisteredCard.Request["source"]["card"], any, any>(
        regMessages.waiting.REGISTERING_CARD,
        async (card) => {
            const amount = Math.round(10 + Math.random() * 140);
            const transaction = await createPayment({
                sendCompleteError: true,
                payment_type: "credit",
                capture: false,
                on_behalf_of: supplier.zoopId,
                customer: storeowner.zoopId,
                statement_descriptor: `Ziro`,
                source: {
                    usage: "single_use",
                    amount,
                    currency: "BRL",
                    type: "card",
                    card,
                },
            });
            collectionRef.doc();
        },
    );
};
