import { useState, useCallback, useMemo, useEffect } from "react";
import { PromiseGen, PromiseCbk, UsePromiseState, StatusType } from "./types";
import { ZiroWaitingMessage, ZiroPromptMessage } from "ziro-messages";
import { useMessage } from "@bit/vitorbarbosa19.ziro.message-modal";

export function usePromise<A, R, E>(
  promise: PromiseGen<A, R>,
  deps: React.DependencyList = []
): [PromiseCbk<A>, UsePromiseState<R, E>] {

  //set promise state
  const [status, setStatus] = useState<StatusType>("firstRender");
  const [attempts, setAttempts] = useState<number>(0);
  const [result, setResult] = useState<R | null>(null);
  const [error, setError] = useState<E | null>(null);

  //set promise callback
  const callback = useCallback(
    async (args: A) => {
      try {
        if (status === "running") return;
        setStatus("running");
        const result = await promise(args);
        setResult(result);
        setStatus("success");
      } catch (error) {
        if(!error.skipAttempt) setAttempts((a) => a+1)
        setError(error.error||error)
        setStatus("failed");
      } finally {
      }
    },
    [status, setStatus, setResult, setError, setAttempts, ...deps]
  );

  //set reset state callback
  const reset = useCallback(() => {
    setAttempts(0)
    setResult(null)
    setError(null)
    setStatus("stale")
  },[setAttempts, setResult, setError, setStatus])

  //set final state that will sincronize result and error variables with status
  const state = useMemo<UsePromiseState<R, E>>(() => {
    switch (status) {
      case "success":
        return { reset, status, attempts, result, error: null };
      case "failed":
        return { reset, status, attempts, result: null, error };
      default:
        return { reset, status, attempts, result: null, error: null };
    }
  }, [reset,status,attempts,result,error]);

  //use effect to set promise to stale after first rend
  useEffect(() => setStatus("stale"),[])

  return [callback, state];
}

export function usePromiseShowingMessage<A, R, E>(
  message: ZiroWaitingMessage<string,string,any>,
  promise: PromiseGen<A,R>,
  deps: React.DependencyList = []
): [(args?: A) => void, UsePromiseState<R,E>] {

  const [cbk,state] = usePromise<A,R,E>(promise, deps)

  const setMessage = useMessage()

  const newCbk = useCallback((args?: A) => setMessage(message.withPromise(cbk(args))),[setMessage,message,cbk])

  useEffect(() => {
    if(state.status==="failed" && state.error instanceof ZiroPromptMessage) setMessage(state.error)
  },[state.status])

  return [newCbk, state]
}