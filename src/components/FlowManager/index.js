import React, { useState } from 'react'
import Button from '../Button'
import Header from '../Header'
import { doubleButton, singleButton, container, content } from './styles'
import { AnimatePresence, useAnimation, motion } from 'framer-motion'
import { useRouter } from 'wouter'
import { useEffect } from 'react'
import { useCallback } from 'react'

const FlowManager = ({ children, title, next, previous, onError }) => {

    const router = useRouter()
    const [,setLocation] = router.hook()
    const controls = useAnimation()

    useEffect(() => { controls.start('normal') },[])

    const onClickNext = useCallback(() => {
        router.lastFlowButton = 'next'
        next.onClick ? next.onClick()
            .then(() => controls.start('goForward'))
            .then(() => next.location && setLocation(next.location))
            .catch(onError)
            :
            controls.start('goForward')
            .then(() => next.location && setLocation(next.location))
            .catch(onError)
    },[controls,router,next])

    const onClickPrevious = useCallback(() => {
        router.lastFlowButton = 'previous'
        previous.onClick ? previous.onClick()
            .then(() => controls.start('goBack'))
            .then(() => previous.location && setLocation(previous.location))
            .catch(onError)
            :
            controls.start('goBack')
            .then(() => previous.location && setLocation(previous.location))
            .catch(onError)
    },[controls,router,previous])

    const onDiverge = useCallback((location) => {
        router.lastFlowButton = 'diverge'
        controls.start('diverge')
        .then(() => location && setLocation(location))
    },[controls,router])

    const onConverge = useCallback((location) => {
        router.lastFlowButton = 'converge'
        controls.start('converge')
        .then(() => location && setLocation(location))
    })

    return (
        <div style={container}>
            <AnimatePresence>
                <motion.div
                    key={title+'header'}
                    initial={{ opacity: 0 }}
                    animate={controls}
                    exit={{}}
                    variants={{
                        goForward: { opacity: 0 },
                        normal: { opacity: 1 },
                        goBack: { opacity: 0 }
                    }}
                >
                    <Header type='title-only' title={title}/>
                </motion.div>
                <motion.div
                    key={title+'content'}
                    style={content}
                    initial={
                        router.lastFlowButton === 'previous' ? { x: '-150%' } :
                        router.lastFlowButton === 'next' ? { x: '150%' } :
                        { x: '0%', opacity: 0 }
                    }
                    animate={controls}
                    exit={{}}
                    transition={{ type: 'tween' }}
                    variants={{
                        goBack: { x: '150%' },
                        goForward: { x: '-150%' },
                        normal: { x: '0%', opacity: 1 }
                    }}
                >
                    {children}
                </motion.div>
                <motion.div
                    key={title+'buttons'}
                    style={next && previous ? doubleButton : singleButton}
                    initial={{ opacity: 0 }}
                    animate={controls}
                    exit={{}}
                    transition={{ type: 'tween' }}
                    variants={{
                        goForward: { opacity: 0 },
                        normal: { opacity: 1 },
                        goBack: { opacity: 0 }
                    }}
                >
                    {
                        previous &&
                        <Button
                            type='click'
                            cta={previous.title}
                            click={onClickPrevious}
                        />
                    }
                    {
                        next &&
                        <Button
                            type='click'
                            cta={next.title}
                            click={onClickNext}
                        />
                    }
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default FlowManager