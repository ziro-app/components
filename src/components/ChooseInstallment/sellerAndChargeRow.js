import React from 'react'
import PropTypes from 'prop-types'
import currencyFormat from '@ziro/currency-format'
import { doubleRow, title, subTitle } from './styles'

const _SellerAndChargeRow = ({ seller, charge }) => 
    <div style={doubleRow}>
        <h1 style={title}>{seller}</h1>
        <h1 style={subTitle}>{currencyFormat(charge)}</h1>
    </div>

_SellerAndChargeRow.propTypes = {
    seller: PropTypes.string.isRequired,
    charge: PropTypes.string.isRequired
}

export const SellerAndChargeRow = React.memo(_SellerAndChargeRow)