import { useState, useCallback, useMemo, useEffect } from "react";
import { ZiroWaitingMessage, isPrompt, isWaiting } from "ziro-messages";
//@ts-ignore
import { useMessage } from "@bit/vitorbarbosa19.ziro.message-modal";
import { PromiseGen, PromiseCbk, UsePromiseState, StatusType } from "./types";
import { useMountState } from "./useMountState";

/**
 * Esse hook retorna uma tupla com um callback e um objeto contendo o stado da função assincrona declarada,
 * o objeto de estado contem status, result, error, attempts e reset
 * @param promise O callback assincrono
 * @param deps As dependencias para que o callback seja refatorado
 */
export function usePromise<A, R, E>(promise: PromiseGen<A, R>, deps: React.DependencyList = []): [PromiseCbk<A>, UsePromiseState<R, E>] {
    const mountState = useMountState();

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
                if (mountState.current === "unmounted") return;
                setResult(result);
                setStatus("success");
            } catch (error) {
                if (mountState.current === "unmounted") return;
                if (!error.skipAttempt) setAttempts((a) => a + 1);
                setError(error.error || error);
                setStatus("failed");
            }
        },
        [status, setStatus, setResult, setError, setAttempts, ...deps],
    );

    //set reset state callback
    const reset = useCallback(() => {
        setAttempts(0);
        setResult(null);
        setError(null);
        setStatus("stale");
    }, [setAttempts, setResult, setError, setStatus]);

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
    }, [reset, status, attempts, result, error]);

    //use effect to set promise to stale after first rend
    useEffect(() => setStatus("stale"), []);

    return [callback as PromiseCbk<A>, state];
}

/**
 * Esse hook retorna uma tupla com um callback e um objeto contendo o stado da função assincrona declarada,
 * o objeto de estado contem status, result, error, attempts e reset. Alem disso aceita uma ZiroWaitingMessage para ser mostrada
 * enquanto estiver sendo executado, e mostrará qualquer ZiroMessage que seja retornada ou "jogada" (pelo throw) de dentro do
 * callback.
 * @param message A mensagem que será mostrada enquanto o callback estiver sendo executado
 * @param promise O callback assincrono
 * @param deps As dependencias para que o callback seja refatorado
 */
export function usePromiseShowingMessage<A, R, E>(
    message: ZiroWaitingMessage<string, string, any>,
    promise: PromiseGen<A, R>,
    deps: React.DependencyList = [],
): [(args?: A) => Promise<void>, UsePromiseState<R, E>] {
    const [cbk, state] = usePromise<A, R, E>(promise, deps);

    const setMessage = useMessage();

    const newCbk = useCallback(
        (args?: A) => new Promise<void>((res) => setMessage(message.withPromise(cbk(args).finally(res)))),
        [setMessage, message, cbk],
    );

    useEffect(() => {
        if (state.status === "failed" && (isPrompt(state.error) || isWaiting(state.error))) setMessage(state.error);
        if (state.status === "success" && (isPrompt(state.result) || isWaiting(state.result))) setMessage(state.result);
    }, [state.status]);

    return [newCbk, state];
}
