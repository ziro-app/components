import {
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

type InterceptorArguments<V> = Parameters<AxiosInterceptorManager<V>["use"]>;

type Interceptor<V> = {
  onFulfilled: InterceptorArguments<V>[0];
  onRejected: InterceptorArguments<V>[1];
};

export type RequestInterceptor = Interceptor<AxiosRequestConfig>;
export type ResponseInterceptor<T = any> = Interceptor<AxiosResponse<T>>;
