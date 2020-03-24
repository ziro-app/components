import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { container, headerContainer, footerContainer } from './styles'
import { flowContext } from './hooks'

export * from './hooks'

const FlowManager = ({ children, defaultHeader, defaultFooter, maxWidth = 500, background }) => {

    const headerRef = useRef()
    const [header, setHeader] = useState(defaultHeader)
    const [hideHeader, setHideHeader] = useState(false)

    const footerRef = useRef()
    const [footer, setFooter] = useState(defaultFooter)
    const [hideFooter, setHideFooter] = useState(false)

    const contentRef = useRef()

    const [modal, setModal] = useState()
    const [scroll, setScroll] = useState(true)
    const [scrollPosition, setScrollPosition] = useState(0)

    const [cache, setCache] = useState({})

    const contentControls = useAnimation()
    const flowControls = useAnimation()
    const [isAnimating, setIsAnimating] = useState(false)
    const [hijackAnimation, setHijackAnimation] = useState([])
    const [currentAnimation, setCurrentAnimation] = useState()
    const [shouldEnter, setShouldEnter] = useState(false)

    useEffect(() => {

        if(!shouldEnter) return
        setShouldEnter(false)
        if(isHijaked(window.location.pathname)) {
            setIsAnimating(false)
            return
        }

        if(!contentRef) return
        contentControls &&
        currentAnimation &&
        currentAnimation.enter &&
        contentControls.start(currentAnimation.enter).then(() => setIsAnimating(false))

    },[shouldEnter])

    const isHijaked = useCallback((location) => hijackAnimation.some((loc) => loc === location),[hijackAnimation])
    const setHijaked = useCallback((location) => {
        hijackAnimation.every((loc) => loc !== location) && setHijackAnimation(loc => [...loc,location])
    },[hijackAnimation, setHijackAnimation])

    useEffect(() => {
        const paddingTop = !hideHeader && header && headerRef.current && headerRef.current.clientHeight || 0
        const paddingBottom = !hideFooter && footer && footerRef.current && footerRef.current.clientHeight || 0
        contentControls.start({ paddingTop, paddingBottom })
    },[header, footer, hideHeader, hideFooter ])

    const context = {
        //headerContext
        header,
        defaultHeader,
        setHeader,
        hideHeader,
        setHideHeader,
        //footerContext
        footer,
        defaultFooter,
        setFooter,
        hideFooter,
        setHideFooter,
        //contentContext
        contentRef: contentRef.current,
        //modalContext
        setModal,
        scroll,
        setScroll,
        scrollPosition,
        setScrollPosition,
        //flowContext
        contentControls,
        flowControls,
        isAnimating,
        setIsAnimating,
        isHijaked,
        setHijaked,
        currentAnimation,
        setCurrentAnimation,
        shouldEnter,
        setShouldEnter,
        //cacheContext
        cache,
        setCache,
    }

    console.log({ scrollPosition })

    return (
        <div style={{ ...container, maxWidth, background }}>
            <flowContext.Provider value={context}>
                <AnimatePresence>
                {
                    children &&
                    <motion.div
                        key='content'
                        ref={contentRef}
                        initial={{ opacity: 1 }}
                        animate={contentControls}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'tween' }}
                        style={{ position: scroll ? 'relative' : 'fixed', top: scroll ? 0 : -scrollPosition, width: '100%' }}
                    >
                        {children}
                    </motion.div>
                }
                {
                    header && !hideHeader &&
                    <motion.div
                        key='header'
                        ref={headerRef}
                        transition={{
                            type: 'spring',
                            damping: 150,
                            stiffness: 500
                        }}
                        initial={{ y: '-100%' }}
                        animate={{ y: '0%' }}
                        exit={{ y: '-100%' }}
                        style={{ ...headerContainer, maxWidth }}
                    >
                        {header}
                    </motion.div>
                }
                {
                    footer && !hideFooter &&
                    <motion.div
                        key='footer'
                        ref={footerRef}
                        transition={{
                            type: 'spring',
                            damping: 150,
                            stiffness: 500
                        }}
                        initial={{ y: '100%' }}
                        animate={{ y: '0%' }}
                        exit={{ y: '100%' }}
                        style={{ ...footerContainer, maxWidth }}
                    >
                        {footer}
                    </motion.div>
                }
                </AnimatePresence>
                { modal }
            </flowContext.Provider>
        </div>
    )

}

export default FlowManager