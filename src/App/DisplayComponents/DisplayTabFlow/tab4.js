import React from 'react'
import Header from '../../../components/Header'
import { useHeader, useFooter, usePersistentScroll, useHideOnScroll, useAnimatedLocation, useHistory } from '../../../components/FlowManager'
import { BottomTabBar } from './bottomBar'
import { useEffect } from 'react'
import { useState } from 'react'

export default () => {
    const history = useHistory()

    console.log({ history })

    const setLocation = useAnimatedLocation()[1]

    useHeader(<Header type='title-only' title='tab4'/>,[])

    usePersistentScroll()
    useHideOnScroll()

    return (
        <div style={{ display: 'grid', background: 'yellow', height: '100%', width: '100%' }}>
        </div>
    )
}