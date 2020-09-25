import axios, { CancelToken } from "axios";
import { FullOCR, Biometry, is } from "./types";
import { request, response } from "./interceptors";
import { instanceConfig, URLs } from "./constants";

const nextCode = axios.create(instanceConfig);

nextCode.interceptors.request.use(request.onFulfilled, request.onRejected);
nextCode.interceptors.response.use(response.onFulfilled, response.onRejected);

export { Biometry, FullOCR, URLs, is };
export default nextCode;

export const analiseDocument = (url: string, cancelToken?: CancelToken) =>
    nextCode.post<any, FullOCR.Response.KnownDocument | FullOCR.Response.UnknownDocument>(URLs.document, { url }, { cancelToken });

export const biometry = (url1: string, url2: string, cancelToken?: CancelToken) =>
    nextCode.post<any, Biometry.Response>(URLs.biometry, { url1, url2 }, { cancelToken });
