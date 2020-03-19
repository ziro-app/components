import React from 'react'

const HeaderFlow = ({ title }) => {

    return (
        <div style={{ display: 'grid', height: '50px', alignItems: 'center' }}>
            <label style={{ textAlign: 'center', fontSize: '1.8rem' }}>{title}</label>
        </div>
    )
}

export default HeaderFlow