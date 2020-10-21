import { ZoopPromptMessage, RedePromptMessage, ZoopPromptCollection, RedePromptCollection } from "ziro-messages/dist/src/zoop";
import { prompt } from "ziro-messages/dist/src/catalogo/antifraude/common";
import { UnregisteredTransaction } from "@bit/vitorbarbosa19.ziro.pay.zoop";

type InnerErrorData = {
    data?: { gateway_authorizer?: string; history?: UnregisteredTransaction.History[]; error: { message: string; message_display: string } };
};

export type DetachedCheckoutError =
    | ZoopPromptMessage<keyof ZoopPromptCollection, InnerErrorData>
    | RedePromptMessage<keyof RedePromptCollection, InnerErrorData>
    | typeof prompt["CANNOT_SAVE_TO_FIRESTORE"];
