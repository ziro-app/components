import React from 'react'
import Header from '../../../components/Header'
import { useHeader, useFooter, usePersistentScroll, useHideOnScroll, useScrollBottom, useIsContentConsumed } from '../../../components/FlowManager'
import { BottomTabBar } from './bottomBar'
import { useEffect } from 'react'
import { useState } from 'react'

export default () => {

    useHeader(<Header type='title-only' title='tab3'/>,[])
    useFooter()

    usePersistentScroll()
    useHideOnScroll()

    const [numbers, setNumbers] = useState([])

    useEffect(() => {
        const interval = setInterval(() => {
            setNumbers(old => [...old, old.length])
        },500)
        return () => clearInterval(interval)
    })

    return (
        <div style={{ display: 'grid', background: 'yellow', height: '100%', width: '100%' }}>
            {numbers.map((_,index) => {

                return <label>{index}</label>
            })}
        </div>
    )
}