import axios,{ CancelToken } from "axios";
import { FullOCR } from "./types";
import { request, response } from "./interceptors";
import { instanceConfig, URL } from "./constants";

const nextCode = axios.create(instanceConfig);

nextCode.interceptors.request.use(request.onFulfilled, request.onRejected);
nextCode.interceptors.response.use(response.onFulfilled, response.onRejected);

const { is } = FullOCR;
export { FullOCR, is, URL };
export default nextCode

export const analiseDocument = (url: string, cancelToken?: CancelToken) =>
    nextCode.post<any,FullOCR.Response.KnownDocument|FullOCR.Response.UnknownDocument>(URL.document,{ url },{ cancelToken })