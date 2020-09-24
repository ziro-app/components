import axios, { AxiosError } from "axios";
import * as Sentry from "@sentry/react";
import { prompt, rede } from "ziro-messages/dist/src/zoop";
import { RequestInterceptor, ResponseInterceptor } from "@bit/vitorbarbosa19.ziro.utils.axios";
import { ZiroPromptMessage } from "ziro-messages";

type RedeMessage = typeof rede[keyof typeof rede];
type ZoopMessage = typeof prompt[keyof typeof prompt];
type GenericMessage = ZiroPromptMessage<string, string, any>;

export const request: RequestInterceptor = {
    onFulfilled: (config) => config,
    onRejected: (error) => {
        const sentryEventId = Sentry.captureException(error);
        return Promise.reject(prompt.UNKNOWN_ERROR.withAdditionalData({ error, sentryEventId }));
    },
};

const redeMessageFinder = (error: any) => ({ additionalData }: RedeMessage) => error.response_code === additionalData.response_code;

const zoopMessageFinder = (error: any) => ({ additionalData }: ZoopMessage) => additionalData.status === error.status;

function getRightMessage(error: AxiosError) {
    const sentryEventId = Sentry.captureException(error);
    let data = error.response.data;
    let innerError = data.error || {};
    let redeMessage: GenericMessage = Object.values(rede).find(redeMessageFinder(innerError));
    let zoopMessage: GenericMessage = Object.values(prompt).find(zoopMessageFinder(innerError));
    let unknown: GenericMessage = prompt.UNKNOWN_ERROR;
    return (redeMessage || zoopMessage || unknown).withAdditionalData({ data, sentryEventId });
}

export const response: ResponseInterceptor = {
    onFulfilled: ({ data }) => data,
    onRejected: (error) => {
        if (axios.isCancel(error)) return;
        if (error.code === "ECONNABORTED")
            return Promise.reject(prompt.SERVICE_REQUEST_TIMEOUT.withAdditionalData({ message: error.message, code: error.code }));
        return Promise.reject(getRightMessage(error));
    },
};
