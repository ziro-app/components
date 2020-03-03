import React, { useEffect, useCallback } from 'react'
import { useRouter } from 'wouter'
import { useAnimation } from 'framer-motion'

export const useAnimatedLocation = (onError, onMount) => {
    const router = useRouter()
    const [,setLocation] = router.hook()
    const controls = useAnimation()

    useEffect(() => { controls.start('normal').then(onMount) },[])

    const navigate = useCallback(async (direction, onClick, location) => {
        try {
            const msg = onClick && await onClick()
            if(location) {
                await controls.start(direction)
                router.lastFlowButton = direction
                setLocation(location)
            }
            return msg
        }
        catch(error) {
            if(onError) onError(error)
            else throw error
        }
    },[controls,router,onError])

    const onNext = useCallback((onClick, location) => navigate('next', onClick, location), [navigate])
    const onPrevious = useCallback((onClick, location) => navigate('previous', onClick, location), [navigate])
    const onDiverge = useCallback((onClick, location) => navigate('diverge', onClick, location), [navigate])
    const onConverge = useCallback((onClick, location) => navigate('converge', onClick, location), [navigate])

    return { onNext, onPrevious, onDiverge, onConverge, controls }

}