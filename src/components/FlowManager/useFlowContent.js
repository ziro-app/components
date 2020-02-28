import React, { useRef, useState, useCallback, useEffect } from 'react'

export const useFlowContent = () => {

    const ref = useRef(null)

    const [scrollMaxInset, setScrollMaxInset] = useState(0)
    const [scrollInsetTop, setScrollInsetTop] = useState(0)
    const [scrollInsetBottom, setScrollInsetBottom] = useState(0)

    const onScroll = useCallback(({ target }) => {
        if(target==ref.current) {
            const { clientHeight, scrollHeight, scrollTop } = ref.current
            setScrollInsetTop(scrollTop)
            setScrollInsetBottom(scrollHeight-clientHeight-scrollTop)
        }
    },[setScrollInsetBottom,setScrollInsetTop])

    useEffect(() => {
        if(ref.current) {
            const { clientHeight, scrollHeight, scrollTop } = ref.current
            const maxInset = scrollHeight-clientHeight-scrollTop
            setScrollInsetBottom(maxInset)
            setScrollMaxInset(maxInset)
        }
    },[ref.current])

    return [{ ref, onScroll }, scrollMaxInset, scrollInsetBottom, scrollInsetTop]
    
}