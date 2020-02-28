import React, { useEffect, useCallback } from 'react'
import { useRouter } from 'wouter'
import { useAnimation } from 'framer-motion'

export const useAnimatedLocation = (onError) => {
    const router = useRouter()
    const [,setLocation] = router.hook()
    const controls = useAnimation()

    useEffect(() => { controls.start('normal') },[])

    const navigate = useCallback(async (direction, onClick, location) => {
        try {
            onClick && await onClick()
            if(location) {
                await controls.start(direction)
                router.lastFlowButton = direction
                location && setLocation(location)
            }
        }
        catch(error) {
            if(onError) onError(error)
            else throw error
        }
    },[controls,router,onError])

    const next = useCallback((onClick, location) => navigate('next', onClick, location), [navigate])
    const previous = useCallback((onClick, location) => navigate('previous', onClick, location), [navigate])
    const diverge = useCallback((onClick, location) => navigate('diverge', onClick, location), [navigate])
    const converge = useCallback((onClick, location) => navigate('converge', onClick, location), [navigate])

    return [next, previous, diverge, converge, controls]

}