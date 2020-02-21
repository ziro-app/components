import React, { useState } from 'react'
import Button from '../Button'
import Header from '../Header'
import { doubleButton, singleButton, container, content } from './styles'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'wouter'

const FlowButtonsWrapper = ({ children, title, next, previous }) => {

    const router = useRouter()
    const [exit, setExit] = useState('-150%')

    return (
        <div style={container}>
            <AnimatePresence exitBeforeEnter>
                <motion.div
                    key={title+'header'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'tween' }}
                >
                    <Header type='title-only' title={title}/>
                </motion.div>
                <motion.div
                    key={title+'content'}
                    style={content}
                    initial={{ x: router.lastPress == 'previous' ? '-150%' : '150%' }}
                    animate={{ x: '0%' }}
                    exit={{ x: exit }}
                    transition={{ type: 'tween' }}
                >
                    {children}
                </motion.div>
                <motion.div
                    key={title+'buttons'}
                    style={next && previous ? doubleButton : singleButton}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'tween' }}
                >
                    {
                        previous &&
                        <Button
                            type='click'
                            cta={previous.title}
                            click={() => {
                                router.lastPress = 'previous'
                                setExit('150%')
                                previous.onClick()
                            }}
                        />
                    }
                    {
                        next &&
                        <Button
                            type='click'
                            cta={next.title}
                            click={() => {
                                router.lastPress = 'next'
                                setExit('-150%')
                                next.onClick()
                            }}
                        />
                    }
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default FlowButtonsWrapper