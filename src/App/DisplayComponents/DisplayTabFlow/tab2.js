import React from 'react'
import Header from '../../../components/Header'
import { useHeader, useFooter, useCache } from '../../../components/FlowManager'
import { BottomTabBar } from './bottomBar'

export default () => {

    useHeader(<Header type='title-only' title='tab2'/>,[])
    useFooter(<BottomTabBar/>,[])

    const [counter, setCounter] = useCache('counter',0)
    const [counter2, setCounter2] = useCache('counter2',0)

    console.log({ counter, counter2 })

    return (
        <div style={{ display: 'grid', background: 'red', height: '100%', width: '100%' }}>
            {Array.from(new Array(10)).map((_,index) => {
                return <label>{index}</label>
            })}
            <div style={{ background: 'yellow', height: 50 }}
                onClick={() => setCounter(old => old+1)}
            />
            <div style={{ background: 'yellow', height: 50 }}
                onClick={() => setCounter2(old => old+1)}
            />
        </div>
    )
}