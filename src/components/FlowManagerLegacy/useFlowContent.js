import React, { useRef, useState, useCallback, useEffect } from 'react'
import { useLayoutEffect } from 'react'

export const useFlowContent = (deps) => {

    const ref = useRef(null)

    const [scrollMaxInset, setScrollMaxInset] = useState(0)
    const [scrollInsetTop, setScrollInsetTop] = useState(0)
    const [scrollInsetBottom, setScrollInsetBottom] = useState(0)
    const [overflow, setOverflow] = useState('auto')

    const onScroll = useCallback(() => {
        if(ref.current) {
            const { clientHeight, scrollHeight, scrollTop } = ref.current
            setScrollInsetTop(scrollTop)
            setScrollInsetBottom(scrollHeight-clientHeight-scrollTop)
        }
    },[setScrollInsetBottom,setScrollInsetTop])

    const setContent = useCallback(() => {
        if(ref.current && overflow==='auto') {
            const { clientHeight, scrollHeight, scrollTop } = ref.current
            const maxInset = scrollHeight-clientHeight
            const scrollBottom = maxInset ? maxInset - scrollTop : 0
            setScrollInsetBottom(scrollBottom)
            setScrollMaxInset(maxInset)
            if(!maxInset) setOverflow('visible')
        }
        else {
            setOverflow('auto')
        }
    },[overflow])

    useEffect(() => { setContent() },[ref.current && ref.current.clientHeight, ...(deps||[])])

    useEffect(() => {
        window.addEventListener('resize', setContent)
        return () => window.removeEventListener('resize', setContent)
    })

    return [{ ref, onScroll }, scrollMaxInset, scrollInsetBottom, scrollInsetTop, overflow]
    
}