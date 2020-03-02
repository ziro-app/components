import React from 'react'
import { useRouter } from 'wouter'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'

export const FlowDiv = ({
    controls,
    style,
    children,
    normal,
    next,
    previous,
    diverge,
    converge,
    transition = { type: 'tween'}
}) => {
    const { lastFlowButton } = useRouter()

    const initial = useMemo(() => {
        switch(lastFlowButton) {
            case 'next' : return previous
            case 'previous' : return next
            case 'diverge' : return converge
            case 'converge' : return diverge
            default: return normal
        }
    },[lastFlowButton, previous, next, converge, diverge])

    return (
        <motion.div
            style={style}
            animate={controls}
            transition={transition}
            variants={{ normal, next, previous, diverge, converge }}
            initial={initial}
        >
            {children}
        </motion.div>
    )
}