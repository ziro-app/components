import axios,{ CancelToken } from "axios";
import { Document } from "./types";
import { request, response } from "./interceptors";
import { instanceConfig, URL } from "./constants";

const nextCode = axios.create(instanceConfig);

nextCode.interceptors.request.use(request.onFulfilled, request.onRejected);
nextCode.interceptors.response.use(response.onFulfilled, response.onRejected);

const { is } = Document;
export { Document, is, URL };
export default nextCode

export const analiseDocument = (url: string, cancelToken?: CancelToken) =>
    nextCode.post<any,Document.Response.KnownDocument|Document.Response.UnknownDocument>(URL.document,{ url },{ cancelToken })