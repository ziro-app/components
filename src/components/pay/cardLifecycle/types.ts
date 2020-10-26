import { ZoopPromptMessage, RedePromptMessage, ZoopPromptCollection, RedePromptCollection } from "ziro-messages/dist/src/zoop";
import { prompt } from "ziro-messages/dist/src/catalogo/antifraude/common";
import { prompt as payPrompt } from "ziro-messages/dist/src/catalogo/pay/checkout";
import { UnregisteredTransaction, RegisteredTransaction } from "@bit/vitorbarbosa19.ziro.pay.zoop";

type InnerErrorData = {
    data?: { gateway_authorizer?: string; history?: UnregisteredTransaction.History[]; error: { message: string; message_display: string } };
};

export type DetachedCheckoutError =
    | ZoopPromptMessage<keyof ZoopPromptCollection, InnerErrorData>
    | RedePromptMessage<keyof RedePromptCollection, InnerErrorData>
    | typeof prompt["CANNOT_SAVE_TO_FIRESTORE"];

type InnerErrorRegisteredData = {
    data?: { gateway_authorizer?: string; history?: RegisteredTransaction.History[]; error: { message: string; message_display: string } };
};

export type RegisteredCheckoutError =
    | ZoopPromptMessage<keyof ZoopPromptCollection, InnerErrorRegisteredData>
    | RedePromptMessage<keyof RedePromptCollection, InnerErrorRegisteredData>
    | typeof prompt["CANNOT_SAVE_TO_FIRESTORE"]
    | typeof payPrompt["NO_INSTALLMENTS"];
