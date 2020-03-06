import React from 'react'
import Header from '../../../components/Header'
import { useHeader } from '../../../components/FlowManager'

export default () => {

    useHeader(<Header type='title-only' title='tab3'/>)

    return (
        <div style={{ display: 'grid', background: 'yellow', height: '100%', width: '100%' }}>
            {Array.from(new Array(100)).map((_,index) => {
                return <label>{index}</label>
            })}
        </div>
    )
}