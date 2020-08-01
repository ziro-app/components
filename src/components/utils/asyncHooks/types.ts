export type PromiseGen<A, R> = (args?: A) => Promise<R>;
export type PromiseCbk<A> = (args?: A) => Promise<void>;
type StaleState = {
  status: "firstRender" | "stale" | "running";
  result: null;
  error: null;
};
type SuccessState<R> = {
  status: "success";
  result: R;
  error: null;
};
type FailedState<E> = {
  status: "failed";
  result: null;
  error: E;
};
export type UseEffectState<R, E> =
  ( StaleState
  | SuccessState<R>
  | FailedState<E>)&{ reset: () => void };
export type UsePromiseState<R, E> = UseEffectState<R, E> & { attempts: number };
export type StatusType = UseEffectState<any, any>["status"];
