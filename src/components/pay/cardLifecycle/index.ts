import { usePromiseShowingMessage } from "@bit/vitorbarbosa19.ziro.utils.async-hooks";
import { useMessagePromise } from "@bit/vitorbarbosa19.ziro.message-modal";
import * as delMessages from "ziro-messages/dist/src/catalogo/pay/chooseCard";
import * as regMessages from "ziro-messages/dist/src/catalogo/antifraude/registerCard";
import { deleteCard, createPayment, associateCard, createCardToken, UnregisteredCard, voidPayment } from "@bit/vitorbarbosa19.ziro.pay.zoop";
import { useCancelToken } from "@bit/vitorbarbosa19.ziro.utils.axios";
import { useFirebaseCardsCollectionRef } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { useCallback, useMemo, useRef } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { useStoreowner } from "@bit/vitorbarbosa19.ziro.firebase.storeowners";
import { useZoopRegistration } from "@bit/vitorbarbosa19.ziro.pay.zoop-registration";

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

export const useRegisterCard = (onSuccess: () => void) => {
    const source = useCancelToken();
    const onSuccessRef = useRef(onSuccess);
    onSuccessRef.current = onSuccess;
    const collectionRef = useFirebaseCardsCollectionRef();
    const query = useFirestore().collection("suppliers").where("fantasia", "==", "ZIRO");
    const Fs = useFirestore;
    const [supplier] = useFirestoreCollectionData<{ zoopId: string }>(query);
    const zoopId = useZoopRegistration();
    return usePromiseShowingMessage<UnregisteredCard, any, any>(
        regMessages.waiting.REGISTERING_CARD,
        async (card) => {
            const amount = Math.round(10 + Math.random() * 140);
            const transaction = await createPayment(
                {
                    sendCompleteError: true,
                    payment_type: "credit",
                    capture: false,
                    on_behalf_of: supplier.zoopId,
                    customer: zoopId,
                    statement_descriptor: `Ziro`,
                    source: {
                        usage: "single_use",
                        amount,
                        currency: "BRL",
                        type: "card",
                        card,
                    },
                },
                source.token,
            );
            await voidPayment(
                {
                    transaction_id: transaction.id,
                    on_behalf_of: transaction.on_behalf_of,
                    amount: transaction.amount.replace(".", ""),
                },
                source.token,
            );
            const tokenResponse = await createCardToken(card, source.token);
            await associateCard(tokenResponse.id, zoopId, source.token);
            await collectionRef.doc(tokenResponse.id).set({
                status: "pendingDocument",
                antifraudTransaction: transaction.amount.replace(".", ""),
                added: Fs.FieldValue.serverTimestamp() as any,
                updated: Fs.FieldValue.serverTimestamp() as any,
            });
            onSuccessRef.current();
        },
        [source, onSuccessRef, collectionRef, Fs, supplier, zoopId],
    );
};
