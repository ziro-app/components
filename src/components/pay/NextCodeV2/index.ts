import axios, { CancelToken } from "axios";
import { instanceConfig, URLs } from "./constansts";
import { response } from "./interceptors";
import { DocType, is } from "./types";

const nextCodeV2 = axios.create(instanceConfig);

nextCodeV2.interceptors.response.use(response.onFulfilled, response.onRejected);

export { DocType, is };

export const docClassify = (url: string, cancelToken?: CancelToken) =>
    nextCodeV2.post<DocType.Response>(URLs.classify, { urls: { fileName: `${url}` } }, { cancelToken });
