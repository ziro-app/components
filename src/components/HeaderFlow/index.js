import React from 'react'
import { fontTitle } from '@ziro/theme'

const HeaderFlow = ({ title }) => {

    return (
        <div style={{ display: 'grid', height: '50px', alignItems: 'center' }}>
            <label style={{ textAlign: 'center', fontSize: '1.8rem', fontFamily: fontTitle }}>{title}</label>
        </div>
    )
}

export default HeaderFlow