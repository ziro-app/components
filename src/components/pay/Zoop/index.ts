import axios, { CancelToken } from "axios";
import { instanceConfig, URLs } from "./constants";
import { request, response } from "./interceptors";
import { GetCard, DeleteCard, CreateCardToken, AssociateCard, CreateBuyer, CreatePayment } from "./types";
import { createCardTokenParser } from "./createCardTokenParser";
import { createBuyerParser } from "./createBuyerParser";

export * from "./types";

const zoop = axios.create(instanceConfig);

zoop.interceptors.request.use(request.onFulfilled, request.onRejected);
zoop.interceptors.response.use(response.onFulfilled, response.onRejected);

export type ZoopCard = GetCard.Response;
export default zoop;

export const getCard = (card_id: string, cancelToken?: CancelToken) =>
        zoop.get<never, ZoopCard>(URLs.getCard, { params: { card_id }, cancelToken }),
    deleteCard = (card_id: string, cancelToken?: CancelToken) =>
        zoop.delete<never, DeleteCard.Response>(URLs.deleteCard, { params: { card_id }, cancelToken }),
    createCardToken = (card: CreateCardToken.Request.Unparsed, cancelToken?: CancelToken) =>
        zoop.post<never, CreateCardToken.Response>(URLs.createCardToken, createCardTokenParser(card), { cancelToken }),
    associateCard = (token: string, customer: string, cancelToken?: CancelToken) =>
        zoop.post<never, AssociateCard.Response>(URLs.associateCard, { token, customer }, { cancelToken }),
    createBuyer = (buyer: CreateBuyer.Request.Unparsed, cancelToken?: CancelToken) =>
        zoop.post<never, CreateBuyer.Response>(URLs.createBuyer, createBuyerParser(buyer), { cancelToken });
// createPayment = (payment: CreatePayment.CreditRequest, cancelToken?: CancelToken) =>
//     zoop.post<never, CreatePayment.Response>(URLs.createPayment, payment, { cancelToken });
