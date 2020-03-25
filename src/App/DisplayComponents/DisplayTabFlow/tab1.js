import React from 'react'
import Header from '../../../components/Header'
import { useHeader, useFooter, useCache, useAnimatedLocation, useGlobalCache } from '../../../components/FlowManager'
import { BottomTabBar } from './bottomBar'
import { BRANDS } from './cacheKeys'

export default () => {

    useHeader(null,[])

    const [location, setLocation] = useAnimatedLocation()
    const [counter2, setCounter2] = useCache(0)

    const [brands, setBrands] = useGlobalCache(undefined, BRANDS)

    console.log({ brands })

    return (
        <div style={{ display: 'grid', background: 'blue', height: '100%', width: '100%' }}>
            {Array.from(new Array(10)).map((_,index) => {
                return <label>{index}</label>
            })}
            <div style={{ background: 'yellow', height: 50, margin: '10px' }}
                onClick={() => setLocation('goLeft','/tab-flow/2')}
            >
                <label>{`click to test cache`}</label>
            </div>
            <div style={{ background: 'yellow', height: 50, margin: '10px' }}
                onClick={() => setCounter2(old => old+1)}
            >
                <label>{`click to test cache: ${counter2}`}</label>
            </div>
        </div>
    )
}