import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { flowContext } from './hooks'
import Header from '../Header'
import BottomTabBar from '../BottomTabBar'
import { useMemo } from 'react'
import { fontTitle, primaryColor } from '@ziro/theme'
import { useRef } from 'react'

export * from './hooks'

const FlowManager = ({ children }) => {

    const headerRef = useRef()
    const footerRef = useRef()
    const [header, setHeader] = useState(<Header type='title-only' title='flowManager'/>)
    const [footer, setFooter] = useState(
        <BottomTabBar
            buttons={[
                {
                    location: '/tab-flow/1'
                },
                {
                    location: '/tab-flow/2'
                },
                {
                    location: '/tab-flow/3'
                },
            ]}
        />
    )

    const contentControls = useAnimation()
    const flowControls = useAnimation()

    useEffect(() => {
        const paddingTop = header && headerRef.current && headerRef.current.clientHeight || 0
        const paddingBottom = footer && footerRef.current && footerRef.current.clientHeight || 0
        contentControls.start({ paddingTop, paddingBottom })
    },[header, footer])

    const context = {
        header,
        setHeader,
        footer,
        setFooter,
        contentControls,
        flowControls
    }

    return (
        <div style={{ display: 'grid', position: 'fixed', top: 0, bottom: 0, right: 0, left: 0, overflowY: 'scroll', overflowX: 'hidden' }}>
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
                    header &&
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
                        style={{
                            position: 'fixed',
                            top: '0',
                            display: 'grid',
                            maxWidth: '500px',
                            width: '100%',
                            boxSizing: 'border-box',
                            background: 'white',
                            boxShadow: '0px 2px 4px 0px rgba(34,34,34,0.25)',
                            overflow: 'hidden',
                            transformOrigin: '50% 0%'
                        }}
                    >
                        {header}
                    </motion.div>
                }
                {
                    footer &&
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
                        style={{
                            position: 'fixed',
                            transformOrigin: '50% 100%',
                            bottom: '0',
                            display: 'grid',
                            maxWidth: '500px',
                            width: '100%',
                            boxSizing: 'border-box',
                            background: 'white',
                            boxShadow: '0px -2px 4px 0px rgba(34,34,34,0.25)'
                        }}
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