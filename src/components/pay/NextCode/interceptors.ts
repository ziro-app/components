import axios, { AxiosError, AxiosResponse } from "axios";
import { prompt } from "ziro-messages/dist/src/nextcode"
import * as Sentry from "@sentry/react"
import { ZiroPromptMessage, NextCodeCodes } from "ziro-messages"
import { Refresh } from "./types";
import { loginConfig } from "./constants";
import { RequestInterceptor, ResponseInterceptor } from "@bit/vitorbarbosa19.ziro.utils.axios";

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
    const sentryEventId = Sentry.captureException(error)
    return Promise.reject(prompt.BAD_REQUEST.withAdditionalData({ error, sentryEventId }))
  },
};

type Message = ZiroPromptMessage<NextCodeCodes,string,{ response: AxiosResponse<any>, sentryEventId: string }>
const getRightMessage = function(error: AxiosError<any>): Message  {
  const sentryEventId = Sentry.captureException(error)
  switch(error.response.status) {
    case 400: return prompt.BAD_REQUEST.withAdditionalData({ response: error.response, sentryEventId })
    case 401: return prompt.UNAUTHORIZED.withAdditionalData({ response: error.response, sentryEventId })
    case 403: return prompt.FORBIDDEN.withAdditionalData({ response: error.response, sentryEventId })
    case 404: return prompt.NOT_FOUND.withAdditionalData({ response: error.response, sentryEventId })
    case 405: return prompt.METHOD_NOT_ALLOWED.withAdditionalData({ response: error.response, sentryEventId })
    case 410: return prompt.GONE.withAdditionalData({ response: error.response, sentryEventId })
    case 422: return prompt.UNPROCESSABLE_ENTITY.withAdditionalData({ response: error.response, sentryEventId })
    case 500: return prompt.INTERNAL_SERVER_ERROR.withAdditionalData({ response: error.response, sentryEventId })
    case 503: return prompt.SERVICE_UNAVAILABLE.withAdditionalData({ response: error.response, sentryEventId })
    default:  return prompt.UNKNOWN_ERROR.withAdditionalData({ response: error.response, sentryEventId })
  }
}

export const response: ResponseInterceptor = {
  onFulfilled: ({ data: { refresh, stats, ...data } = {} }) => {
    if (refresh) credentials = refresh;
    return data;
  },
  onRejected: (error) => {
    console.log({ error })
    if(axios.isCancel(error)) return
    if(error.code === "ECONNABORTED") return Promise.reject(prompt.TIMEOUT.withAdditionalData({ error }))
    return Promise.reject(getRightMessage(error))
  },
};
