import React from 'react'
import Header from '../../../components/Header'
import { useHeader, useFooter, usePersistentScroll, useHideOnScroll, useScrollBottom, useIsContentConsumed } from '../../../components/FlowManager'
import { BottomTabBar } from './bottomBar'
import { useEffect } from 'react'
import { useState } from 'react'

export default () => {

    useHeader(<Header type='title-only' title='tab4'/>,[])
    useFooter()

    usePersistentScroll()
    useHideOnScroll()

    return (
        <div style={{ display: 'grid', background: 'yellow', height: '100%', width: '100%' }}>
        </div>
    )
}