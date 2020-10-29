import { useState, useEffect, useMemo, useCallback } from "react";
import { PromiseGen, UseEffectHistory, UseEffectReturn, UseRetriableEffectReturn } from "./types";
import { useMountState } from "./useMountState";
import { ZiroWaitingMessage, isPrompt, isWaiting } from "ziro-messages";
import { prompt } from "ziro-messages/dist/src/catalogo";
import { useMessage } from "@bit/vitorbarbosa19.ziro.message-modal";
import * as Sentry from "@sentry/react";

/**
 * Esse hook roda um efeito assincrono sempre que as dependencias mudam, funciona exatamente da mesma forma
 * que o useEffect, mas retorna um objeto contendo status, result, error, history e reset
 * @param promise o efeito assincrono
 * @param deps as dependencias
 */
export function useAsyncEffect<R, E>(promise: PromiseGen<ReturnType<typeof useMountState>, R>, deps?: React.DependencyList): UseEffectReturn<R, E> {
    //setup promise state
    const [started, setStarted] = useState<number>(0);
    const [finished, setFinished] = useState<number>(0);
    const [history, setState] = useState<UseEffectHistory<R, E>>([{ status: "firstRender", result: null, error: null }]);

    const mountState = useMountState();

    //set promise callback
    useEffect(() => {
        const run = started;
        setStarted((r) => r + 1);
        setState((old) => {
            old[run] = { status: "running", result: null, error: null };
            return old;
        });
        promise(mountState)
            .then((result) => {
                if (mountState.current === "unmounted") return;
                setState((old) => {
                    old[run] = { status: "success", result, error: null };
                    return old;
                });
            })
            .catch((error) => {
                if (mountState.current === "unmounted") return;
                setState((old) => {
                    old[run] = { status: "failed", result: null, error };
                    return old;
                });
            })
            .finally(() => {
                if (mountState.current === "unmounted") return;
                setFinished((f) => f + 1);
            });
    }, deps);

    //set reset state callback
    const reset = useCallback(() => {
        setStarted(0);
        setFinished(0);
        setState([{ status: "stale", result: null, error: null }]);
    }, [setState]);

    //set final state that will sincronize result and error variables with status
    const state = useMemo<UseEffectReturn<R, E>>(() => {
        const { status, result, error } = history[history.length - 1];
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

/**
 * Esse hook roda um efeito assincrono toda vez que as dependencias mudam, e caso a promise do efeito seja rejeitada, ele rodará
 * novamente, retorna um objeto contendo o status, result, error, history, reset e attempts
 * @param promise o efeito assincrono
 * @param deps as dependencias
 */
export function useRetriableAsyncEffect<R, E>(
    promise: PromiseGen<ReturnType<typeof useMountState>, R>,
    deps?: React.DependencyList,
): UseRetriableEffectReturn<R, E> {
    const [attempts, setAttempts] = useState<number>(1);

    const _state = useAsyncEffect<R, E>(promise, [attempts, ...deps]);

    useEffect(() => _state.status === "failed" && setAttempts((a) => a + 1), [_state.status]);
    useEffect(() => setAttempts(1), deps);

    const reset = useCallback(() => {
        _state.reset();
        setAttempts(1);
    }, [_state.reset]);

    const state = useMemo<UseRetriableEffectReturn<R, E>>(() => ({ ..._state, reset, attempts }), [_state, reset, attempts]);

    return state;
}

type UAE = typeof useAsyncEffect;
type URAE = typeof useRetriableAsyncEffect;
type S<R, E, H extends URAE | UAE> = H extends URAE ? UseRetriableEffectReturn<R, E> : H extends UAE ? UseEffectReturn<R, E> : never;

const showingMessage = <H extends UAE | URAE>(hook: H) =>
    function <R, E>(
        message: ZiroWaitingMessage<string, string, any> | null,
        promise: PromiseGen<ReturnType<typeof useMountState>, R>,
        deps?: React.DependencyList,
    ): S<R, E, H> {
        const setMessage = useMessage();

        const newPromise = useMemo(() => {
            if (!message) return promise;
            return ((mountState) =>
                new Promise((resolve, reject) => {
                    setMessage(
                        message.withPromise(
                            promise(mountState)
                                .catch((error) => {
                                    if (isPrompt(error) || isWaiting(error)) throw error;
                                    else {
                                        const unknownError = prompt.UNKNOWN_ERROR.withAdditionalData({ error });
                                        Sentry.captureException(unknownError);
                                        throw unknownError;
                                    }
                                })
                                .then(resolve, reject),
                        ),
                    );
                })) as PromiseGen<ReturnType<typeof useMountState>, R>;
        }, [message, promise]);

        const state = (hook as any)(newPromise, deps);

        useEffect(() => {
            if (state.status === "failed" && (isPrompt(state.error) || isWaiting(state.error))) setMessage(state.error);
            if (state.status === "success" && (isPrompt(state.result) || isWaiting(state.result))) setMessage(state.result);
        }, [state.status]);

        return state;
    };

/**
 * Esse hook roda um efeito assincrono toda vez que as dependencias mudam, caso uma ZiroWaitingMessage seja fornecida ele mostrará
 * a mensagem enquanto roda, e mostrara qualquer ZiroMessage que seja retornada ou "jogada" (pelo throw) dentro do efeito assincrono,
 * retorna um objeto contendo status, result, error, history e reset
 * @param message A ZiroWaitingMessage que será mostrada quando o efeito rodar, nada será mostrado se essa variavel for null
 * @param promise O efeito assincrono
 * @param deps As dependencias
 */
export const useAsyncEffectShowingMessage = showingMessage(useAsyncEffect);

/**
 * Esse hook roda um efeito assincrono toda vez que as dependencia mudam, caso uma ZiroWaitingMessage seja fornecida ele mostrará
 * a mensagem enquanto roda, e mostrará qualquer ZiroMessage que seja retorna ou "jogada" (pelo throw) dentro do efeito assincrono,
 * e caso a promise do efeito seja rejeitada, ele rodará novamente. retorna um objeto contendo status, result, error, history, attempts,
 * e reset
 * @param message A ZiroWaitingMessage que será mostrada quando o efeito rodar, nada será mostrado se essa variavel for null
 * @param promise O efeito assincrono
 * @param deps As dependencias
 */
export const useRetriableAsyncEffectShowingMessage = showingMessage(useRetriableAsyncEffect);
