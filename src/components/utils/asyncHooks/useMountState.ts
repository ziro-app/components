import { useRef, useEffect } from "react"

export const useMountState = () => {
    const state = useRef<"mounted"|"unmounted">(null)
    useEffect(() => {
        state.current = "mounted"
        return () => state.current = "unmounted"
    },[])
    return state
}