import React, { useRef, useState, useCallback, useEffect } from 'react'
import { useLayoutEffect } from 'react'

export const useFlowContent = (children) => {

    const ref = useRef(null)

    const [scrollMaxInset, setScrollMaxInset] = useState(0)
    const [scrollInsetTop, setScrollInsetTop] = useState(0)
    const [scrollInsetBottom, setScrollInsetBottom] = useState(0)
    const [overflowY, setOverflowY] = useState('auto')
    const [overflowX, setOverflowX] = useState('hidden')
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

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
            let maxInset = scrollHeight-clientHeight-scrollTop
            maxInset = maxInset > 10 ? maxInset: 0
            setScrollInsetBottom(maxInset)
            setScrollMaxInset(maxInset)
            setOverflowY(maxInset ? 'auto' : 'visible')
            setOverflowX(maxInset ? 'hidden' : 'visible')
        }
    },[ref.current, ref.current && ref.current.clientHeight, ref.current && ref.current.scrollHeight, windowSize.height, windowSize.width])

    useLayoutEffect(() => {
        const updateSize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight })
            setOverflowY('auto')
            setOverflowX('hidden')
        }
        window.addEventListener('resize', updateSize)
        updateSize()
        return () => window.removeEventListener('resize', updateSize)
    },[])

    useLayoutEffect(() => {
        setOverflowX('hidden')
        setOverflowY('auto')
    },[children])

    return [{ ref, onScroll }, scrollMaxInset, scrollInsetBottom, scrollInsetTop, overflowY, overflowX]
    
}