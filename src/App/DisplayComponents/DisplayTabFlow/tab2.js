import React from 'react'
import Header from '../../../components/Header'
import { useHeader, useFooter, useCache } from '../../../components/FlowManager'
import { BottomTabBar } from './bottomBar'

export default () => {

    useHeader(<Header type='title-only' title='tab2'/>,[])

    const [counter, setCounter] = useCache(0)
    const [counter2, setCounter2] = useCache(0)

    return (
        <div style={{ display: 'grid', background: 'red', height: '100%', width: '100%' }}>
            {Array.from(new Array(10)).map((_,index) => {
                return <label>{index}</label>
            })}
            <div style={{ background: 'yellow', height: 50, margin: '10px' }}
                onClick={() => setCounter(old => old+1)}
            >
                <label>{`click to test cache: ${counter}`}</label>
            </div>
            <div style={{ background: 'yellow', height: 50, margin: '10px' }}
                onClick={() => setCounter2(old => old+1)}
            >
                <label>{`click to test cache: ${counter2}`}</label>
            </div>
        </div>
    )
}