import { useState, useEffect, useMemo, useCallback } from "react";
import { PromiseGen, UseEffectHistory, UseEffectReturn, UseRetriableEffectReturn } from "./types";
import { useMountState } from "./useMountState"

export function useAsyncEffect<R, E>(
  promise: PromiseGen<never, R>,
  deps: React.DependencyList = []
): UseEffectReturn<R,E> {

  //setup promise state
  const [started,setStarted] = useState<number>(0)
  const [finished,setFinished] = useState<number>(0)
  const [history,setState] = useState<UseEffectHistory<R,E>>([{ status: "firstRender", result: null, error: null }])

  const mountState = useMountState()

  //set promise callback
  useEffect(() => {
    const run = started
    setStarted(r => r+1)
    setState(old => {
      old[run] = { status: "running", result: null, error: null }
      return old
    })
    promise()
      .then((result) => {
        if(mountState.current==="unmounted") return
        setState(old => {
          old[run] = { status: "success", result, error: null }
          return old
        })
      })
      .catch((error) => {
        if(mountState.current==="unmounted") return
        setState(old => {
          old[run] = { status: "failed", result: null, error }
          return old
        })
      })
      .finally(() => {
        if(mountState.current==="unmounted") return
        setFinished(f => f+1)
      })
  }, deps);

  //set reset state callback
  const reset = useCallback(() => {
    setStarted(0)
    setFinished(0)
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
  }, [reset, started, finished]);

  return state;
}

export function useRetriableAsyncEffect<R, E>(
  promise: PromiseGen<never, R>,
  deps: React.DependencyList = []
): UseRetriableEffectReturn<R,E> {

  const [attempts, setAttempts] = useState<number>(1)

  const _state = useAsyncEffect<R,E>(promise, [attempts,...deps])

  useEffect(() => _state.status==="failed" && setAttempts(a => a+1),[_state.status])
  useEffect(() => setAttempts(1),deps)

  const reset = useCallback(() => {
    _state.reset()
    setAttempts(1)
  },[_state.reset])

  const state = useMemo<UseRetriableEffectReturn<R,E>>(() => ({ ..._state, reset, attempts }),[_state,reset,attempts])

  return state

}