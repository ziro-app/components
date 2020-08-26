import axios, { AxiosError } from "axios";
import * as Sentry from "@sentry/react";
import { prompt } from "ziro-messages/dist/src/zoop";
import { RequestInterceptor, ResponseInterceptor } from "@bit/vitorbarbosa19.ziro.utils.axios";

export const request: RequestInterceptor = {
    onFulfilled: (config) => config,
    onRejected: (error) => {
        const sentryEventId = Sentry.captureException(error);
        return Promise.reject(prompt.UNKNOWN_ERROR.withAdditionalData({ error, sentryEventId }));
    },
};

function getRightMessage(error: AxiosError) {
    const sentryEventId = Sentry.captureException(error);
    return ((Object.values(prompt).find(
        ({ additionalData }) =>
            additionalData.status === error.response.data.error.status &&
            additionalData.type === error.response.data.error.type &&
            additionalData.category === error.response.data.error.category,
    ) || prompt.UNKNOWN_ERROR) as any).withAdditionalData({ response: error.response, sentryEventId });
}

export const response: ResponseInterceptor = {
    onFulfilled: ({ data }) => data,
    onRejected: (error) => {
        if (axios.isCancel(error)) return;
        if (error.code === "ECONNABORTED")
            return Promise.reject(prompt.SERVICE_REQUEST_TIMEOUT.withAdditionalData({ error }));
        return Promise.reject(getRightMessage(error));
    },
};
