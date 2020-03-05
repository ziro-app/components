import React from 'react'
import Header from '../../../components/Header'
import { useHeader } from '../../../components/FlowManagerV2'

export default () => {

    useHeader(null)

    return (
        <div style={{ display: 'grid', background: 'blue', height: '100%', width: '100%' }}>
            {Array.from(new Array(100)).map((_,index) => {
                return <label>{index}</label>
            })}
        </div>
    )
}