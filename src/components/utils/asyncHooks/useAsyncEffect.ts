import { useState, useEffect, useMemo, useCallback } from "react";
import { PromiseGen, UseEffectState, StatusType } from "./types";

export function useAsyncEffect<R, E>(
  promise: PromiseGen<never, R>,
  deps: React.DependencyList = []
): UseEffectState<R, E> {

  //setup promise state
  const [status, setStatus] = useState<StatusType>("firstRender");
  const [result, setResult] = useState<R | null>(null);
  const [error, setError] = useState<E | null>(null);

  //set promise callback
  useEffect(() => {
    if (status === "running") return;
    setStatus("running");
    promise()
      .then((result) => {
        setResult(result);
        setStatus("success");
      })
      .catch((error) => {
        setError(error);
        setStatus("failed");
      });
  }, [setStatus, setResult, setError, ...deps]);

  //set reset state callback
  const reset = useCallback(() => {
    setStatus("stale")
    setResult(null)
    setError(null)
  },[setStatus,setResult,setError])

  //set final state that will sincronize result and error variables with status
  const state = useMemo<UseEffectState<R, E>>(() => {
    switch (status) {
      case "success":
        return { reset, status, result, error: null };
      case "failed":
        return { reset, status, result: null, error };
      default:
        return { reset, status, result: null, error: null };
    }
  }, [reset, status, result, error]);

  return state;
}
