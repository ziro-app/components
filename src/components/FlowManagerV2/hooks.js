import React, { useContext, useEffect } from 'react'
import { useLocation } from 'wouter'
import { useCallback } from 'react'

const showError = () => console.error('NO_FLOW_CONTEXT')

export const

flowContext = React.createContext({
    header: null,
    setHeader: showError,
    footer: null,
    setFooter: showError,
    contentControls: null,
    flowControls: null
}),

useHeader = (header) => {
    const { setHeader } = useContext(flowContext)
    const { type, props } = header || {}
    useEffect(() => setHeader(header), [type, ...Object.values(props||{})])
},

useFooter = (footer) => {
    const { setFooter } = useContext(flowContext)
    const { type, props } = footer || {}
    useEffect(() => setFooter(footer), [type, ...Object.values(props||{})])
},

useAnimatedLocation = () => {
    const { contentControls } = useContext(flowContext)
    const [_location,setLocation] = useLocation()
    const navigate = useCallback(async (animation = {}, location) => {
        contentControls && animation.exit && await contentControls.start(animation.exit)
        setLocation(location)
        contentControls && animation.initial && contentControls.set(animation.initial)
        contentControls && animation.enter && await contentControls.start(animation.enter)
    },[contentControls, setLocation])
    return [_location, navigate]
}