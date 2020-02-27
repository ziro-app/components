import React from 'react'
import { useRouter } from 'wouter'
import { motion } from 'framer-motion'

export const FlowDiv = ({
    controls,
    style,
    children,
    normal = { opacity: 1 },
    next = { opacity: 0 },
    previous = { opacity: 0 },
    diverge = { opacity: 0 },
    converge = { opacity: 0 }
}) => {
    const router = useRouter()
    return (
        <motion.div
            style={style}
            animate={controls}
            variants={{ normal, next, previous, diverge, converge }}
            initial={
                router.lastFlowButton === 'next' ? previous :
                router.lastFlowButton === 'previous' ? next :
                router.lastFlowButton === 'diverge' ? converge :
                router.lastFlowButton === 'converge' ? diverge :
                normal
            }
        >
            {children}
        </motion.div>
    )
}