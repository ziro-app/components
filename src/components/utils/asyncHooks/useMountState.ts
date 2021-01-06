import { useRef, useEffect } from "react";

/**
 * Esse hook retorna um objeto contendo uma variavel current que pode ser "mounted" ou "unmounted",
 * dependendo do estado do componente em que foi chamado
 */
export const useMountState = () => {
    const state = useRef<"firstRender" | "mounted" | "unmounted">("firstRender");
    useEffect(() => {
        state.current = "mounted";
        return () => (state.current = "unmounted");
    }, []);
    return {
        get current() {
            return state.current;
        },
    };
};
