import React, { useContext, useEffect } from 'react'
import { useLocation } from 'wouter'
import { useCallback } from 'react'
import * as defaultAnimations from './defaultAnimations'

const showError = () => console.error('NO_FLOW_CONTEXT')

export const

flowContext = React.createContext({
    header: null,
    defaultHeader: null,
    setHeader: showError,
    footer: null,
    defaultFooter: null,
    setFooter: showError,
    contentControls: null,
    flowControls: null
}),

useHeader = (header = {}) => {
    const { setHeader } = useContext(flowContext)
    const { type, props } = header
    useEffect(() => setHeader(header), [type, ...Object.values(props||{})])
},

useDefaultHeader = () => {
    const { defaultHeader, setHeader } = useContext(flowContext)
    useEffect(() => setHeader(defaultHeader),[defaultHeader])
},

useFooter = (footer = {}) => {
    const { setFooter } = useContext(flowContext)
    const { type, props } = footer
    useEffect(() => setFooter(footer), [type, ...Object.values(props||{})])
},

useDefaultFooter = () => {
    const { defaultFooter, setFooter } = useContext(flowContext)
    useEffect(() => setFooter(defaultFooter), [defaultFooter])
},

useAnimatedLocation = () => {
    const { contentControls } = useContext(flowContext)
    const [_location,setLocation] = useLocation()
    const navigate = useCallback(async (animation = {}, location) => {
        const { exit, initial, enter } = typeof animation === 'string' ? defaultAnimations[animation] || {} : animation
        contentControls && exit && await contentControls.start(exit)
        setLocation(location)
        contentControls && initial && contentControls.set(initial)
        contentControls && enter && await contentControls.start(enter)
    },[contentControls, setLocation])
    return [_location, navigate]
}