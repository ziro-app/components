import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useLocation } from 'wouter'
import { useCallback } from 'react'
import * as defaultAnimations from './defaultAnimations'

const showError = () => console.error('NO_FLOW_CONTEXT')

const SCROLL_Y = Symbol('SCROLL_Y')
const SCROLL_Y_HIDE_HEADER = Symbol('SCROLL_Y_HIDE_HEADER')
const SCROLL_Y_HIDE_FOOTER = Symbol('SCROLL_Y_HIDE_FOOTER')

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
    //flowContext
    contentControls: null,
    flowControls: null,
    //cacheContext
    cache: null,
    setCache: showError,
}),

useHeader = (header, deps) => {
    const { setHeader } = useContext(flowContext)
    useEffect(() => setHeader(header), deps)
},

useDefaultHeader = () => {
    const { defaultHeader, setHeader } = useContext(flowContext)
    useEffect(() => setHeader(defaultHeader),[defaultHeader])
},

useFooter = (footer, deps) => {
    const { setFooter } = useContext(flowContext)
    useEffect(() => setFooter(footer), deps)
},

useDefaultFooter = () => {
    const { defaultFooter, setFooter } = useContext(flowContext)
    useEffect(() => setFooter(defaultFooter), [defaultFooter])
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

useCache = (name, initialValue) => {
    const { cache, setCache } = useContext(flowContext)
    const [location] = useLocation()
    const setValue = useCallback((value) => {
        setCache(oldCache => ({
            ...oldCache,
            [location]: {
                ...(oldCache[location]||{}),
                [name]: typeof value === 'function' ?
                    value(oldCache[location] && oldCache[location][name] || initialValue)
                    : value
            }
        }))
    },[setCache,location])
    useLayoutEffect(() => { !cache[location] || !cache[location][name] ? setValue(initialValue) : null },[])
    return [cache[location] && cache[location][name] || initialValue, setValue]
},

usePersistentScroll = (deps = []) => {
    const [scrollY, setScrollY] = useCache(SCROLL_Y,0)
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

useHideHeaderOnScroll = (hideThreshold = 25, showThreshold = 1) => {
    const { setHideHeader } = useContext(flowContext)
    const [scrollY, setScrollY] = useCache(SCROLL_Y_HIDE_HEADER,window.scrollY)
    console.log({ scrollY })
	useEffect(() => {
        setHideHeader(false)
		const toggleHeader = () => setScrollY(prevScrollY => {
			if (prevScrollY > window.scrollY + showThreshold) setHideHeader(false)
			if (prevScrollY < window.scrollY - hideThreshold) setHideHeader(true)
			return window.scrollY
		})
        setTimeout(() => window.addEventListener('scroll', toggleHeader),1000)
		return () => {
            window.removeEventListener('scroll', toggleHeader)
            setHideHeader(false)
        }
	}, [])
},

useHideFooterOnScroll = (hideThreshold = 25, showThreshold = 1) => {
    const { setHideFooter } = useContext(flowContext)
    const [scrollY, setScrollY] = useCache(SCROLL_Y_HIDE_FOOTER,window.scrollY)
    console.log({ scrollY })
	useEffect(() => {
        setHideFooter(false)
		const toggleFooter = () => setScrollY(prevScrollY => {
			if (prevScrollY > window.scrollY + showThreshold) setHideFooter(false)
			if (prevScrollY < window.scrollY - hideThreshold) setHideFooter(true)
			return window.scrollY
        })
        setTimeout(() => window.addEventListener('scroll', toggleFooter),1000)
		return () => {
            window.removeEventListener('scroll', toggleFooter)
            setHideFooter(false)
        }
	}, [])
}