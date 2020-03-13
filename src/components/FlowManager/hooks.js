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
    isAnimating: null,
    setIsAnimating: showError,
    isHijaked: showError,
    setHijaked: showError,
    currentAnimation: null,
    setCurrentAnimation: showError,
    shouldEnter: null,
    setShouldEnter: showError,
    //cacheContext
    cache: null,
    setCache: showError,
}),

useHeader = (header, deps = []) => {
    const { setHeader, defaultHeader } = useContext(flowContext)
    useEffect(() => {
        //check for undefined to let null pass
        if(header===undefined) setHeader(defaultHeader)
        else setHeader(header)
    }, deps)
},

useFooter = (footer, deps = []) => {
    const { setFooter, defaultFooter } = useContext(flowContext)
    useEffect(() => {
        //check for undefined to let null pass
        if(footer===undefined) setFooter(defaultFooter)
        else setFooter(footer)
    }, deps)
},

useAnimatedLocation = () => {
    const { contentControls, setIsAnimating, setCurrentAnimation, setShouldEnter } = useContext(flowContext)
    const [_location,setLocation] = useLocation()

    const navigate = useCallback(async (animation = {}, location) => {
        const anim = typeof animation === 'string' ? defaultAnimations[animation] || {} : animation
        setCurrentAnimation(anim)
        setIsAnimating(true)
        contentControls && anim.exit && await contentControls.start(anim.exit)
        setLocation(location)
        contentControls && anim.initial && contentControls.set(anim.initial)
        setShouldEnter(true)
    },[contentControls, setLocation])

    return [_location, navigate]
},

useCache = (initialValue, name) => {
    //block names with only numbers because the anonymous calls are been indexed by number
    if(name && /^[0-9]*$/gm.test(name.toString())) {
        console.error(name+': useCache keys cannot contain only numbers to avoid key collision')
        return [undefined, () => console.error(name+': change key to use this value')]
    }
    const { cache, setCache } = useContext(flowContext)
    //use state to keep location fixed between component transitions
    const [location] = useState(window.location.pathname)
    //get the index of anonymous calls be keeping a map of each location set of calls,
    //calls should be always the same, and in the same order, theorethically, if the
    //number of calls change, this is not a problem, since the order doesn't change
    const [index] = useState(() => {
        if(name) return name
        const _index = cacheCalls.has(location) && cacheCalls.get(location) || 0
        cacheCalls.set(location,_index+1)
        return _index
    })
    //use this callback as a reducer to the cache, but without a fixed number of keys
    const setValue = useCallback((value) => {
        setCache(oldCache => ({
            ...oldCache,
            [location] : {
                ...(oldCache[location]||{}),
                [index]: typeof value === 'function' ? value(oldCache[location] && oldCache[location][index]) : value
            }
        }))
    },[setCache, location])
    useEffect(() => {
        //set the initial value if none was found on mount
        (!cache[location] || !cache[location][index]) && setValue(initialValue === undefined ? null : initialValue)
        //remember to reset the calls map, so in the next mount the index starts on 0
        return () => cacheCalls.set(location,0)
    },[])
    const value = cache[location] && cache[location][index] !== undefined ? cache[location][index] : initialValue
    return [value, setValue]
},

//here deps are not to watch their change,
//but rather if they are all true and scroll can happen
usePersistentScroll = (deps = []) => {
    const { isAnimating, contentControls, contentRef, setHijaked, currentAnimation } = useContext(flowContext)
    const [scrollY, setScrollY] = useCache(0, SCROLL_Y)
    const [hasScrolled, setHasScrolled] = useState(false)
    useEffect(() => {
        const saveScroll = () => setScrollY(window.scrollY)
        window.addEventListener('scroll', saveScroll)
        return () => window.removeEventListener('scroll', saveScroll)
    },[])
    useEffect(() => {
        if(isAnimating || !contentRef || hasScrolled) return
        if(deps.length && deps.some(dep => !dep)) return
        if(contentControls && currentAnimation) {
            contentControls.start(currentAnimation.initial)
                .then(() => {
                    window.scrollTo(0, scrollY)
                    setHasScrolled(true)
                    contentControls.start(currentAnimation.enter)
                })
        }
        else window.scrollTo(0, scrollY)
    },[isAnimating,...deps])
    useLayoutEffect(() => setHijaked(window.location.pathname),[])
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

useScrollPagination = (threshold=window.innerHeight,deps = []) => {
    const { contentRef } = useContext(flowContext)
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const check = useCallback(() => {
        if(!contentRef) {
            setShouldUpdate(false)
            return
        }
        const { clientHeight } = contentRef
        const { innerHeight, scrollY } = window
        const excursion = clientHeight - innerHeight
        innerHeight > clientHeight ? setShouldUpdate(false) :
        setShouldUpdate((excursion - scrollY)<threshold)
    },[contentRef])
    useEffect(() => {
        if(!contentRef) return
        window.addEventListener('scroll', check)
        return () => window.removeEventListener('scroll', check)
    }, [contentRef])
    useEffect(check,[contentRef && contentRef.clientHeight, ...deps])
    return shouldUpdate
},

useIsContentConsumed = (threshold = 0.5) => {
    const { contentRef } = useContext(flowContext)
    const ref = useRef()
    const [isVisualized, setVisualized] = useCache(false)
    useEffect(() => {
        if(!contentRef || !ref.current || isVisualized) return
        const check = () => {

            const { clientHeight: contentHeight } = contentRef
            const { offsetTop, clientHeight } = ref.current
            const { scrollY, innerHeight } = window

            //get current visualized: amount that has been scrolled + percentage of the escreen to scroll
            const currentVisualized = scrollY+((1-threshold)*innerHeight)
            //get bottommost y coordinate of contet: amount content is distant from y = 0 + height of content
            const contentToVisualize = offsetTop + clientHeight
            //get how much of scroll has left: entire height - amount scrolled - screen height
            const scrollBottom = contentHeight - scrollY - innerHeight

            if(currentVisualized>=contentToVisualize || scrollBottom===0) {
                setVisualized(true)
                window.removeEventListener('scroll', check)
            }
        }
        window.addEventListener('scroll', check)
        check()
        return () => window.removeEventListener('scroll', check)
    },[ref.current])
    return [ref, isVisualized]
},

useCachedEffect = (key, effect, deps=[]) => {
    const [_deps, setDeps] = useCache([], key)
    useEffect(() => {
        if(deps.every((dep,index) => dep===_deps[index])) return
        setDeps(deps)
        effect()
    },deps)
}