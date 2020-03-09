import React from 'react'
import Header from '../../../components/Header'
import { useHeader, useFooter, usePersistentScroll, useHideOnScroll, useScrollBottom, useIsContentConsumed } from '../../../components/FlowManager'
import { BottomTabBar } from './bottomBar'
import { useEffect } from 'react'

export default () => {

    useHeader(<Header type='title-only' title='tab3'/>,[])
    useFooter()

    usePersistentScroll()
    useHideOnScroll()

    return (
        <div style={{ display: 'grid', background: 'yellow', height: '100%', width: '100%' }}>
            {Array.from(new Array(100)).map((_,index) => {

                const [ref, isConsumed] = useIsContentConsumed(0.8)

                return <label ref={ref}>{index + (isConsumed ? ' visualized' : '')}</label>
            })}
        </div>
    )
}