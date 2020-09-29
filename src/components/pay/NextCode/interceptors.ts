import axios, { AxiosError } from "axios";
import { prompt } from "ziro-messages/dist/src/nextcode";
import * as Sentry from "@sentry/react";
import type { ZiroPromptMessage } from "ziro-messages";
import type { Refresh } from "./types";
import { loginConfig } from "./constants";
import type { RequestInterceptor, ResponseInterceptor } from "@bit/vitorbarbosa19.ziro.utils.axios";

let credentials: Refresh | undefined;

type NextCodeMessage = typeof prompt[keyof typeof prompt];
type GenericMessage = ZiroPromptMessage<string, string, any>;

const getAccessToken = async () => {
    if (credentials && credentials.exp > Date.now()) return credentials.token;
    const { data } = await axios(loginConfig);
    const { token, exp } = data;
    if (!token || !exp) throw "CANNOT_LOGIN_TO_NEXCODE";
    credentials = { token, exp };
    return token as string;
};

export const request: RequestInterceptor = {
    onFulfilled: async ({ headers = {}, ...config }) => {
        headers["x-access-token"] = await getAccessToken();
        return { ...config, headers };
    },
    onRejected: (error) => {
        const sentryEventId = Sentry.captureException(error);
        return Promise.reject(prompt.BAD_REQUEST.withAdditionalData({ error, sentryEventId }));
    },
};

const nextCodeMessageFinder = (error: any) => ({ additionalData: { status } }: NextCodeMessage) => status === error.status;
const getRightMessage = function (error: AxiosError<any>) {
    const sentryEventId = Sentry.captureException(error);
    let data = error?.response?.data ?? {};
    let innerError = data.error || {};
    let nextCodeMessage: GenericMessage = Object.values(prompt).find(nextCodeMessageFinder(innerError));
    let unknown: GenericMessage = prompt.UNKNOWN_ERROR;
    return (nextCodeMessage || unknown).withAdditionalData({ data, sentryEventId });
};

export const response: ResponseInterceptor = {
    onFulfilled: ({ data: { refresh, stats, ...data } = {} }) => {
        if (refresh) credentials = refresh;
        return data;
    },
    onRejected: (error) => {
        if (axios.isCancel(error)) return;
        if (error.code === "ECONNABORTED") {
            const { code, message } = error;
            const timeout = prompt.TIMEOUT.withAdditionalData({ message, code });
            return Promise.reject(timeout);
        }
        return Promise.reject(getRightMessage(error));
    },
};
