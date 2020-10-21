import { usePromiseShowingMessage, useAsyncEffect } from "@bit/vitorbarbosa19.ziro.utils.async-hooks";
import { useMessagePromise } from "@bit/vitorbarbosa19.ziro.message-modal";
import * as delMessages from "ziro-messages/dist/src/catalogo/pay/chooseCard";
import * as regMessages from "ziro-messages/dist/src/catalogo/antifraude/registerCard";
import * as payMessages from "ziro-messages/dist/src/catalogo/pay/checkout";
import {
    deleteCard,
    createPayment,
    associateCard,
    createCardToken,
    UnregisteredCard,
    voidPayment,
    getReceivables,
    UnregisteredTransaction,
} from "@bit/vitorbarbosa19.ziro.pay.zoop";
import { useAnimatedLocation } from "@bit/vitorbarbosa19.ziro.flow-manager";
import { useCancelToken } from "@bit/vitorbarbosa19.ziro.utils.axios";
import { useFirebaseCardsCollectionRef } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { useCallback, useMemo, useRef } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { useZoopRegistration } from "@bit/vitorbarbosa19.ziro.pay.zoop-registration";
import { useCreditCardPaymentDocument } from "@bit/vitorbarbosa19.ziro.firebase.credit-card-payments";
import creator from "./dataCreators";
import * as errorThrowers from "./errorThrowers";
import prepareDataToDbAndSheet from "./utils/prepareDataToDbAndSheet";
import writeTransactionToSheet from "./utils/writeTransactionToSheet";
import writeReceivablesToSheet from "./utils/writeReceivablesToSheet";
import { DetachedCheckoutError } from "./types";
import { sheet } from "@bit/vitorbarbosa19.ziro.utils.sheets";

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
    const waitingMessage = useRef(regMessages.waiting.REGISTERING_CARD);
    const [cbk, state] = usePromiseShowingMessage<UnregisteredCard & { shouldTransact: boolean }, void, any>(
        waitingMessage.current,
        async ({ shouldTransact, ...card }) => {
            let transaction: UnregisteredTransaction.Response;
            if (shouldTransact) {
                const amount = Math.round(10 + Math.random() * 140);
                transaction = await createPayment(creator.registrationPaymentData(card, supplier.zoopId, zoopId, amount), source.token);
                await voidPayment(creator.registrationVoidData(transaction), source.token);
            }
            const { id: token } = await createCardToken(card, source.token);
            const { id: card_id } = await associateCard(token, zoopId, source.token);
            await collectionRef
                .doc(card_id)
                .set(creator.firebaseCardData(timestamp, transaction))
                .catch(errorThrowers.saveFirestore("register-card"));
            onSuccessRef.current(card_id);
        },
        [source, onSuccessRef, collectionRef, timestamp, supplier, zoopId],
    );
    const newCbk = useCallback((data: UnregisteredCard & { shouldTransact: boolean }) => {
        if (!data.shouldTransact)
            waitingMessage.current = waitingMessage.current.set("userDescription", "Estamos vinculando seu cartão de forma segura.");
        return cbk(data);
    }, []);
    return [newCbk, state] as [typeof newCbk, typeof state];
};

export const useDetachedPayment = (id: string, onSuccess: (dbdata: ReturnType<typeof prepareDataToDbAndSheet>[1]) => void) => {
    const source = useCancelToken();
    const payment = useCreditCardPaymentDocument(id);
    const errorsCollection = useFirestore().collection("credit-card-errors");
    const [, setLocation] = useAnimatedLocation();
    const onSuccessRef = useRef(onSuccess);
    onSuccessRef.current = onSuccess;
    const [cbk, state] = usePromiseShowingMessage<UnregisteredCard & { installments: string }, any, DetachedCheckoutError>(
        payMessages.waiting.SENDING_PAYMENT,
        async ({ installments, ...card }) => {
            const transaction = await createPayment(creator.detachedData(card, installments, payment.data()), source.token);
            const receivablesData = creator.receivablesData(await getReceivables(transaction.id, source.token));
            const [sheetData, dbData, preparedReceivables] = prepareDataToDbAndSheet(transaction, receivablesData, payment.data());
            await writeTransactionToSheet(sheetData);
            await writeReceivablesToSheet(preparedReceivables);
            await payment.ref.update(dbData).catch(errorThrowers.saveFirestore("detached-payment"));
            onSuccessRef.current(dbData);
            return payMessages.prompt.PAYMENT_SUCCESS.withButtons([
                {
                    title: "ver recibo",
                    action: () => {
                        setLocation("goLeft", `/comprovante/${dbData.receiptId}`);
                    },
                },
            ]);
        },
        [source, payment, onSuccessRef],
    );
    useAsyncEffect(async () => {
        if (state.status === "failed") {
            const [values, dbData] = creator.errorData(state.error);
            await sheet(process.env.SHEET_ID_TRANSACTIONS).write({ values, range: "Transacoes_Erros!A1" });
            await errorsCollection.add(dbData);
        }
    }, [state]);
    return [cbk, state] as [typeof cbk, typeof state];
};
