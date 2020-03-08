import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { container, headerContainer, footerContainer } from './styles'
import { flowContext } from './hooks'

export * from './hooks'

const FlowManager = ({ children, defaultHeader, defaultFooter }) => {

    const headerRef = useRef()
    const footerRef = useRef()
    const [header, setHeader] = useState(defaultHeader)
    const [hideHeader, setHideHeader] = useState(false)
    const [footer, setFooter] = useState(defaultFooter)
    const [hideFooter, setHideFooter] = useState(false)

    const [cache, setCache] = useState({})

    const contentControls = useAnimation()
    const flowControls = useAnimation()

    useEffect(() => {
        const paddingTop = header && headerRef.current && headerRef.current.clientHeight || 0
        const paddingBottom = footer && footerRef.current && footerRef.current.clientHeight || 0
        contentControls.start({ paddingTop, paddingBottom })
    },[header, footer])

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
        //flowContext
        contentControls,
        flowControls,
        //cacheContext
        cache,
        setCache,
    }

    return (
        <div style={container}>
            <flowContext.Provider value={context}>
                <AnimatePresence>
                {
                    children &&
                    <motion.div
                        key='content'
                        initial={{ opacity: 1 }}
                        animate={contentControls}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'tween' }}
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
                        style={headerContainer}
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
                        style={footerContainer}
                    >
                        {footer}
                    </motion.div>
                }
                </AnimatePresence>
            </flowContext.Provider>
        </div>
    )

}

export default FlowManager