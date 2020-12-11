import { usePromiseShowingMessage, useAsyncEffect, usePromise, PromiseCbk, UsePromiseState } from "@bit/vitorbarbosa19.ziro.utils.async-hooks";
import { useMessage, useMessagePromise } from "@bit/vitorbarbosa19.ziro.message-modal";
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
    GetCard,
} from "@bit/vitorbarbosa19.ziro.pay.zoop";
//@ts-ignore
import { useAnimatedLocation } from "@bit/vitorbarbosa19.ziro.flow-manager";
import { useCancelToken } from "@bit/vitorbarbosa19.ziro.utils.axios";
import { useFirebaseCardsCollectionRef, useCartCollectionRef, useCatalogUserDataDocument } from "@bit/vitorbarbosa19.ziro.firebase.catalog-user-data";
import { useCallback, useMemo, useRef } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { useZoopRegistration } from "@bit/vitorbarbosa19.ziro.pay.zoop-registration";
import { useCreditCardPaymentDocument } from "@bit/vitorbarbosa19.ziro.firebase.credit-card-payments";
import creator from "./dataCreators";
import * as errorThrowers from "./errorThrowers";
import writeTransactionToSheet from "./utils/writeTransactionToSheet";
import writeReceivablesToSheet from "./utils/writeReceivablesToSheet";
import { sheet } from "@bit/vitorbarbosa19.ziro.utils.sheets";
import { useStoreowner } from "@bit/vitorbarbosa19.ziro.firebase.storeowners";
import * as Sentry from "@sentry/react";
import { paymentSuccessUserResolution } from './paymentSuccessUserResolution';

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
export const useRegisterCard = (onSuccess: (data: { card_id: string; transaction: boolean }) => void) => {
    const source = useCancelToken();
    const onSuccessRef = useRef(onSuccess);
    onSuccessRef.current = onSuccess;
    const collectionRef = useFirebaseCardsCollectionRef();
    const query = useFirestore().collection("suppliers").where("fantasia", "==", "ZIRO");
    const timestamp = useFirestore.FieldValue.serverTimestamp;
    const [supplier] = useFirestoreCollectionData<{ zoopId: string }>(query).data;
    const zoopId = useZoopRegistration();
    const setMessage = useMessage();
    return usePromise<UnregisteredCard & { shouldTransact: boolean }, void, never>(
        async ({ shouldTransact, ...card }) => {
            const promise = (async () => {
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
                onSuccessRef.current({ card_id, transaction: !!transaction });
            })().catch((error) => error);
            setMessage(
                (shouldTransact
                    ? regMessages.waiting.REGISTERING_CARD
                    : regMessages.waiting.REGISTERING_CARD.set("userDescription", "Estamos vinculando seu cartão de forma segura.")
                ).withPromise(promise),
            );
            const result = await promise;
            if (result) setMessage(result);
        },
        [source, onSuccessRef, collectionRef, timestamp, supplier, zoopId],
    );
};

export function usePayment(
    onSuccess: (dbData: ReturnType<typeof creator.registeredPayment.dbAndSheet>[0]) => void,
    id: string,
): [PromiseCbk<UnregisteredCard & { installments: string; card_brand: string }>, UsePromiseState<any, any>];
export function usePayment(
    onSuccess: (dbData: ReturnType<typeof creator.registeredPayment.dbAndSheet>[0]) => void,
    id: string,
    installments: string,
    cardAtom: GetCard.Response,
): [PromiseCbk<void>, UsePromiseState<any, any>];
export function usePayment(onSuccess: (dbData: any) => void, id: string, installments?: string, cardAtom?: GetCard.Response) {
    const source = useCancelToken();
    const payment = useCreditCardPaymentDocument(id);
    const storeowner = useStoreowner();
    const zoopId = storeowner.storeownerId !== "-" ? useZoopRegistration() : undefined;
    const cartCollectionRef = storeowner.storeownerId !== "-" ? useCartCollectionRef() : undefined;
    const catalogUserDataDoc = storeowner.storeownerId !== "-" ? useCatalogUserDataDocument() : undefined;
    const errorsCollection = useFirestore().collection("credit-card-errors");
    const timestamp = useFirestore.FieldValue.serverTimestamp;
    const [, setLocation] = useAnimatedLocation();
    const onSuccessRef = useRef(onSuccess);
    onSuccessRef.current = onSuccess;
    const [cbk, state] = usePromiseShowingMessage(
        payMessages.waiting.SENDING_PAYMENT,
        async ({ installments: _i, ...card }: any = {}) => {
            if (!installments && !_i) throw payMessages.prompt.NO_INSTALLMENTS;
            const i: string = installments || _i;
            const paymentData = payment.data();
            const userData = catalogUserDataDoc && catalogUserDataDoc.exists ? catalogUserDataDoc.data() : undefined;
            const transaction: any = await createPayment(
                await creator.registeredPayment.transaction(i, paymentData, cardAtom || card, zoopId),
                source.token,
            );
            try {
                if (cartCollectionRef && paymentData.cartId) await cartCollectionRef.doc(paymentData.cartId).update({ status: "paid" });
                const receivables = paymentData.insurance ? undefined : await getReceivables(transaction.id, source.token);
                const [dbData, sheetData, receivablesData] = creator.registeredPayment.dbAndSheet(
                    transaction,
                    paymentData,
                    storeowner,
                    receivables,
                    timestamp,
                );
                await writeTransactionToSheet(sheetData);
                if (!paymentData.insurance && receivablesData.length > 0) await writeReceivablesToSheet(receivablesData);
                await payment.ref.update(dbData).catch(errorThrowers.saveFirestore("registered-payment"));
                if (userData && userData.status !== "paid") catalogUserDataDoc.ref.update({ status: "paid" });
                onSuccessRef.current(dbData as any);
            } catch (error) {
                Sentry.captureException(error);
            }
            let message = payMessages.prompt.PAYMENT_SUCCESS;
            if (paymentData.insurance) {
                message = message
                    .set("title", "Pagamento pré-autorizado")
                    .set("userDescription", "O pagamento foi pré autorizado. Em poucos instantes será aprovado. Acompanhe pelo menu de pagamentos.")
                    .set("userResolution", paymentSuccessUserResolution(paymentData.seller))
                    .withButtons([
                        {
                            title: "ver pagamentos",
                            action: () => {
                                setLocation("goLeft", "/pagamentos");
                            },
                        },
                    ]);
            } else {
                if (zoopId) {
                    message = message
                        .set("userDescription", "O pagamento foi concluído")
                        .set("userResolution", paymentSuccessUserResolution(paymentData.seller))
                        .withButtons([
                            {
                                title: "ver pagamentos",
                                action: () => {
                                    setLocation("goLeft", "/pagamentos");
                                },
                            },
                        ]);
                } else {
                    message = message
                        .set("userDescription", "O pagamento foi concluído")
                        .set("userResolution", paymentSuccessUserResolution(paymentData.seller))
                        .withButtons([
                            {
                                title: "ver recibo",
                                action: () => {
                                    setLocation("goLeft", `/comprovante/${transaction.sales_receipt}`);
                                },
                            },
                        ]);
                }
            }
            return message;
        },
        [installments, cardAtom, source, payment, storeowner, zoopId, catalogUserDataDoc],
    );
    useAsyncEffect(async () => {
        if (state.status === "failed") {
            const [values, dbData] = creator.errorRegisteredData(state.error as any, storeowner);
            await sheet(process.env.SHEET_ID_TRANSACTIONS).write({ values, range: "Transacoes_Erros!A1" });
            await errorsCollection.add(dbData);
        }
    }, [state]);
    return [cbk, state];
}
