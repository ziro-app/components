import React from 'react'
import Header from '../../../components/Header'
import { useHeader, useFooter, usePersistentScroll, useHideOnScroll, useAnimatedLocation } from '../../../components/FlowManager'
import { BottomTabBar } from './bottomBar'
import { useEffect } from 'react'
import { useState } from 'react'

export default () => {

    const setLocation = useAnimatedLocation()[1]

    useHeader(<Header type='title-only' title='tab4'/>,[])
    useFooter(
        <div style={{ height: '50px' }}>
            <label onClick={() => setLocation('goRight','/tab-flow/3')}>tab3</label>
        </div>
    )

    usePersistentScroll()
    useHideOnScroll()

    return (
        <div style={{ display: 'grid', background: 'yellow', height: '100%', width: '100%' }}>
        </div>
    )
}