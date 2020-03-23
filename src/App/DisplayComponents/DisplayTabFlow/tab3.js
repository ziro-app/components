import React from 'react'
import Header from '../../../components/Header'
import { useHeader, useFooter, usePersistentScroll, useHideOnScroll, useAnimatedLocation } from '../../../components/FlowManager'
import { BottomTabBar } from './bottomBar'
import { useEffect } from 'react'
import { useState } from 'react'

export default () => {

    useHeader(<Header type='title-only' title='tab3'/>,[])

    const setLocation = useAnimatedLocation()[1]

    useFooter(
        <div style={{ height: '50px' }}>
            <label onClick={() => setLocation('goRight','/tab-flow/2')}>tab2</label>
        </div>
    )

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