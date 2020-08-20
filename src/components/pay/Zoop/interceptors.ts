import axios from "axios";
import * as Sentry from "@sentry/react"
import { RequestInterceptor, ResponseInterceptor } from "@bit/vitorbarbosa19.ziro.utils.axios";

export const request: RequestInterceptor = {
  onFulfilled: (config) => config ,
  onRejected: (error) => {
    console.log('request error',{ error })
    Sentry.captureException(error)
  },
};

export const response: ResponseInterceptor = {
  onFulfilled: ({ data }) => data,
  onRejected: (error) => {
    if(axios.isCancel(error)) return
  }
};
