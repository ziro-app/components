import { useState, useEffect, useMemo, useCallback } from "react";
import { PromiseGen, UseEffectHistory, UseEffectReturn, UseRetriableEffectReturn } from "./types";

export function useAsyncEffect<R, E>(
  promise: PromiseGen<never, R>,
  deps: React.DependencyList = []
): UseEffectReturn<R,E> {

  //setup promise state
  const [runs,setRuns] = useState<number>(0)
  const [finished,setFinished] = useState<number>(0)
  const [history,setState] = useState<UseEffectHistory<R,E>>([{ status: "firstRender", result: null, error: null }])

  //set promise callback
  useEffect(() => {
    const run = runs
    setRuns(r => r+1)
    setState(old => {
      old[run] = { status: "running", result: null, error: null }
      return old
    })
    promise()
      .then((result) => {
        setState(old => {
          old[run] = { status: "success", result, error: null }
          return old
        })
      })
      .catch((error) => {
        setState(old => {
          old[run] = { status: "failed", result: null, error }
          return old
        })
      })
      .finally(() => setFinished(f => f+1))
  }, deps);

  //set reset state callback
  const reset = useCallback(() => {
    setRuns(0)
    setState([{ status: "stale", result: null, error: null }])
  },[setState])

  //set final state that will sincronize result and error variables with status
  const state = useMemo<UseEffectReturn<R,E>>(() => {
    const { status, result, error } = history[history.length-1]
    switch (status) {
      case "success":
        return { reset, status, result, error: null, history };
      case "failed":
        return { reset, status, result: null, error, history };
      default:
        return { reset, status, result: null, error: null, history };
    }
  }, [reset, runs, finished]);

  return state;
}

export function useRetriableAsyncEffect<R, E>(
  promise: PromiseGen<never, R>,
  deps: React.DependencyList = []
): UseRetriableEffectReturn<R,E> {

  const [attempts, setAttempts] = useState<number>(1)

  const _state = useAsyncEffect<R,E>(promise, [attempts,...deps])

  useEffect(() => {
    if(_state.status==="failed") setAttempts(a => a+1)
  },[_state.status])

  useEffect(() => {
    setAttempts(1)
  },[deps])

  const state = useMemo<UseRetriableEffectReturn<R,E>>(() => ({ ..._state, attempts }),[_state,attempts])

  return state

}