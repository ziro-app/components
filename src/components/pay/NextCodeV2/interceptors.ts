import axios, { AxiosError } from "axios";
import { prompt } from "ziro-messages/dist/src/nextcode";
import * as Sentry from "@sentry/react";
import type { ZiroPromptMessage } from "ziro-messages";
import type { ResponseInterceptor } from "@bit/vitorbarbosa19.ziro.utils.axios";

type NextCodeMessage = typeof prompt[keyof typeof prompt];
type GenericMessage = ZiroPromptMessage<string, string, any>;

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
  onFulfilled: ({data}) => {
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