import React, { useEffect, useCallback } from 'react'
import { useRouter } from 'wouter'
import { useAnimation } from 'framer-motion'

export const useAnimatedLocation = (onError) => {
    const router = useRouter()
    const [,setLocation] = router.hook()
    const controls = useAnimation()

    useEffect(() => { controls.start('normal') },[])

    const navigate = useCallback(async (direction, onClick, location) => {
        console.log({ direction, onClick, location })
        try {
            onClick && await onClick()
            await controls.start(direction)
            router.lastFlowButton = direction
            location && setLocation(location)
        }
        catch(error) {
            onError && onError(error)
        }
    },[controls,router,onError])

    const next = (onClick, location) => navigate('next', onClick, location)
    const previous = (onClick, location) => navigate('previous', onClick, location)
    const diverge = (onClick, location) => navigate('diverge', onClick, location)
    const converge = (onClick, location) => navigate('converge', onClick, location)

    return [next, previous, diverge, converge, controls]

}