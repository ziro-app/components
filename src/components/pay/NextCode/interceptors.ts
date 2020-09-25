//@ts-nocheck
import axios, { AxiosError, AxiosResponse } from "axios";
import { prompt } from "ziro-messages/dist/src/nextcode";
import * as Sentry from "@sentry/react";
import type { ZiroPromptMessage, NextCodeCodes } from "ziro-messages";
import type { Refresh } from "./types";
import { loginConfig } from "./constants";
import type { RequestInterceptor, ResponseInterceptor } from "@bit/vitorbarbosa19.ziro.utils.axios";

let credentials: Refresh | undefined;

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

type Message = ZiroPromptMessage<NextCodeCodes, string, { response: AxiosResponse<any>; sentryEventId: string }>;
const getRightMessage = function (error: AxiosError<any>): Message {
    const sentryEventId = Sentry.captureException(error);
    return ((Object.values(prompt).find((message) => message.additionalData.status === error.response.status) ||
        prompt.UNKNOWN_ERROR) as any).withAdditionalData({ data: error.response.data, sentryEventId });
};

export const response: ResponseInterceptor = {
    onFulfilled: ({ data: { refresh, stats, ...data } = {} }) => {
        if (refresh) credentials = refresh;
        return data;
    },
    onRejected: (error) => {
        if (axios.isCancel(error)) return;
        if (error.code === "ECONNABORTED") return Promise.reject(prompt.TIMEOUT.withAdditionalData({ message: error.message, code: error.code }));
        return Promise.reject(getRightMessage(error));
    },
};
