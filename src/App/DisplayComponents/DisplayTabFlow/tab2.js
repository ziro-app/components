import React from 'react'
import Header from '../../../components/Header'
import { useHeader } from '../../../components/FlowManagerV2'

export default () => {

    useHeader(<Header type='title-only' title='tab2'/>)

    return (
        <div style={{ display: 'grid', background: 'red', height: '100%', width: '100%' }}>
            {Array.from(new Array(100)).map((_,index) => {
                return <label>{index}</label>
            })}
        </div>
    )
}