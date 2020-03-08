import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useLocation } from 'wouter'
import { useCallback } from 'react'
import * as defaultAnimations from './defaultAnimations'
import { useRef } from 'react'

const showError = () => console.error('NO_FLOW_CONTEXT')

const SCROLL_Y = Symbol('SCROLL_Y')
const SCROLL_Y_HIDE = Symbol('SCROLL_Y_HIDE')

const cacheCalls = new Map()

export const

flowContext = React.createContext({
    //headerContext
    header: null,
    defaultHeader: null,
    setHeader: showError,
    hideHeader: null,
    setHideHeader: showError,
    //footerContext
    footer: null,
    defaultFooter: null,
    setFooter: showError,
    hideFooter: null,
    setHideFooter: showError,
    //contentContext
    contentRef: null,
    //flowContext
    contentControls: null,
    flowControls: null,
    //cacheContext
    cache: null,
    setCache: showError,
}),

useHeader = (header, deps = []) => {
    const { setHeader, defaultHeader } = useContext(flowContext)
    useEffect(() => {
        if(header===undefined) setHeader(defaultHeader)
        else setHeader(header)
    }, deps)
},

useFooter = (footer, deps = []) => {
    const { setFooter, defaultFooter } = useContext(flowContext)
    useEffect(() => {
        if(footer===undefined) setFooter(defaultFooter)
        else setFooter(footer)
    }, deps)
},

useAnimatedLocation = () => {
    const { contentControls } = useContext(flowContext)
    const [_location,setLocation] = useLocation()
    const navigate = useCallback(async (animation = {}, location) => {
        const { exit, initial, enter } = typeof animation === 'string' ? defaultAnimations[animation] || {} : animation
        contentControls && exit && await contentControls.start(exit)
        setLocation(location)
        contentControls && initial && contentControls.set(initial)
        contentControls && enter && await contentControls.start(enter)
    },[contentControls, setLocation])
    return [_location, navigate]
},

useCache = (initialValue, name) => {
    if(name && /^[0-9]*$/gm.test(name.toString())) {
        console.error('useCache keys cannot contain only numbers to avoid key collision')
        return [undefined, () => console.error('change key to use this value')]
    }
    const { cache, setCache } = useContext(flowContext)
    const [location] = useState(window.location.pathname)
    const [index] = useState(() => {
        if(name) return name
        const index = cacheCalls.has(location) && cacheCalls.get(location) || 0
        cacheCalls.set(location,index+1)
        return index
    })
    const setValue = useCallback((value) => {
        setCache(oldCache => ({
            ...oldCache,
            [location] : {
                ...(oldCache[location]||{}),
                [index]: typeof value === 'function' ? value(oldCache[location] && oldCache[location][index]) : value
            }
        }))
    },[setCache, location])
    useLayoutEffect(() => {
        (!cache[location] || !cache[location][index]) && setValue(initialValue)
        return () => cacheCalls.set(location,0)
    },[])
    const value = cache[location] ? cache[location][index] : undefined
    return [ value ? value : initialValue, setValue]
},

usePersistentScroll = (deps = []) => {
    const [scrollY, setScrollY] = useCache(0, SCROLL_Y)
    useEffect(() => {
        const saveScroll = () => setScrollY(window.scrollY)
        window.addEventListener('scroll', saveScroll)
        return () => window.removeEventListener('scroll', saveScroll)
    },[])
    useLayoutEffect(() => {
        if(!deps.length) window.scrollTo(0,scrollY)
        else deps.every(dep => dep) && window.scrollTo(0, scrollY)
    },deps)
},

useHideOnScroll = (element = 'both',hideThreshold = 25, showThreshold = 5) => {
    const { setHideHeader, setHideFooter, contentRef } = useContext(flowContext)
    const [scrollY, setScrollY] = useCache(window.scrollY,SCROLL_Y_HIDE)
	useEffect(() => {
        if(!contentRef) return
		const toggleHeader = () => setScrollY(prevScrollY => {
			if (prevScrollY > window.scrollY + showThreshold) {
                if (element === 'both' || element === 'header') setHideHeader(false)
                if (element === 'both' || element === 'footer') setHideFooter(false)
            }
			if (prevScrollY < window.scrollY - hideThreshold) {
                if(element === 'both' || element === 'header') setHideHeader(true)
                if(element === 'both' || element === 'footer') setHideFooter(true)
            }
			return window.scrollY
        })
        window.addEventListener('scroll', toggleHeader)
		return () => {
            window.removeEventListener('scroll', toggleHeader)
            setHideHeader(false)
        }
	}, [contentRef])
},

useScrollBottom = (type = 'absolute') => {
    const { contentRef } = useContext(flowContext)
    const [scrollBottom, setScrollBottom] = useState(undefined)
    useEffect(() => {
        if(!contentRef) return
        const check = () => {
            const { clientHeight } = contentRef
            const { innerHeight, scrollY } = window
            const excursion = clientHeight - innerHeight
            setScrollBottom(type === 'percentage' ? (excursion - scrollY)/excursion : (excursion - scrollY))
        }
        window.addEventListener('scroll', check)
        check()
        return () => window.removeEventListener('scroll', check)
    }, [contentRef])
    return scrollBottom
},

useIsContentConsumed = () => {
    const ref = useRef()
    const [isVisualized, setVisualized] = useCache(false)
    useEffect(() => {
        if(!ref.current) return
        const check = () => {
            const { offsetTop, clientHeight } = ref.current
            const { scrollY, innerHeight } = window
            const currentVisualized = scrollY+innerHeight
            const contentToVisualize = offsetTop + clientHeight
            if(currentVisualized>=contentToVisualize && !isVisualized) {
                setVisualized(true)
                window.removeEventListener('scroll', check)
            }
        }
        !isVisualized && window.addEventListener('scroll', check)
        check()
        return () => window.removeEventListener('scroll', check)
    },[ref.current])
    return [ref, isVisualized]
}