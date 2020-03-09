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

    const scroll = useScrollBottom('absolute',[numbers.length])

    useEffect(() => {
        setInterval(() => {
            setNumbers(old => [...old, Array.from(new Array(100))])
        },5000)
    })

    console.log({ scroll })

    return (
        <div style={{ display: 'grid', background: 'yellow', height: '100%', width: '100%' }}>
            {numbers.map((_,index) => {

                return <label>{index}</label>
            })}
        </div>
    )
}