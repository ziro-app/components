import React from 'react'
import PropTypes from 'prop-types'
import { container, content, header } from './styles'
import { SellerAndChargeRow } from '../SellerAndChargeRow'
import { InstallmentOptions } from './installmentOptions'

const Summary = ({ charge, maxInstallments, seller, misc }) => {
    return (
        <div style={container}>
            <SellerAndChargeRow seller={seller} charge={charge}/>
            <h1 style={header}>Parcelamento</h1>
            <InstallmentOptions charge={charge} maxInstallments={maxInstallments}/>
            {
                misc &&
                <>
                    <h1 style={header}>{misc.title}</h1>
                    <div style={content}>{misc.text}</div>
                </>
            }
		</div>
    )
}

Summary.propTypes = {
    seller: PropTypes.string.isRequired,
    charge: PropTypes.string.isRequired,
    maxInstallments: PropTypes.string.isRequired,
    misc: PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    })
}

export default Summary