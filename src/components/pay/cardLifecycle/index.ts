import { usePromiseShowingMessage } from "@bit/vitorbarbosa19.ziro.utils.async-hooks";
import { useMessagePromise } from "@bit/vitorbarbosa19.ziro.message-modal";
import * as delMessages from "ziro-messages/dist/src/catalogo/pay/chooseCard";
import * as regMessages from "ziro-messages/dist/src/catalogo/antifraude/registerCard";
import * as commonMessages from "ziro-messages/dist/src/catalogo/antifraude/common";
import {
    deleteCard,
    createPayment,
    associateCard,
    createCardToken,
    UnregisteredCard,
    voidPayment,
    getReceivables,
} from "@bit/vitorbarbosa19.ziro.pay.zoop";
import { useCancelToken } from "@bit/vitorbarbosa19.ziro.utils.axios";
import { useFirebaseCardsCollectionRef } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { useCallback, useMemo, useRef } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { useZoopRegistration } from "@bit/vitorbarbosa19.ziro.pay.zoop-registration";
import { useCreditCardPaymentDocumentData } from "@bit/vitorbarbosa19.ziro.firebase.credit-card-payments";
import creator from "./dataCreators";
import * as errorThrowers from "./errorThrowers";

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
            await collectionRef.doc(id).delete().catch(errorThrowers.deleteFirestore);
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

/**
 * Esse hook retorna um callback para registrar um cartão
 */
export const useRegisterCard = (onSuccess: (card_id: string) => void) => {
    const source = useCancelToken();
    const onSuccessRef = useRef(onSuccess);
    onSuccessRef.current = onSuccess;
    const collectionRef = useFirebaseCardsCollectionRef();
    const query = useFirestore().collection("suppliers").where("fantasia", "==", "ZIRO");
    const timestamp = useFirestore.FieldValue.serverTimestamp;
    const [supplier] = useFirestoreCollectionData<{ zoopId: string }>(query);
    const zoopId = useZoopRegistration();
    return usePromiseShowingMessage<UnregisteredCard, void, any>(
        regMessages.waiting.REGISTERING_CARD,
        async (card) => {
            const amount = Math.round(10 + Math.random() * 140);
            const transaction = await createPayment(creator.registrationPaymentData(card, supplier.zoopId, zoopId, amount), source.token);
            await voidPayment(creator.registrationVoidData(transaction), source.token);
            const { id: token } = await createCardToken(card, source.token);
            const { id: card_id } = await associateCard(token, zoopId, source.token);
            await collectionRef
                .doc(card_id)
                .set(creator.firebaseCardData(transaction, timestamp))
                .catch(errorThrowers.saveFirestore("register-card"));
            onSuccessRef.current(card_id);
        },
        [source, onSuccessRef, collectionRef, timestamp, supplier, zoopId],
    );
};

export const useDetachedPayment = (id: string) => {
    const source = useCancelToken();
    const payment = useCreditCardPaymentDocumentData(id);
    const [cbk, state] = usePromiseShowingMessage<UnregisteredCard & { installments: string }, any, any>(
        regMessages.waiting.REGISTERING_CARD,
        async ({ installments, ...card }) => {
            const transaction = await createPayment(creator.detachedData(card, installments, payment), source.token);
            const receivablesData = creator.receivablesData(await getReceivables(transaction.id, source.token));
        },
        [],
    );
};
