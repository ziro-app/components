import React from 'react'
import PropTypes from 'prop-types'
import { doubleRow, titleStyle, subTitle } from './styles'

const _SellerAndChargeRow = ({ title, quantity }) => 
    <div style={doubleRow}>
        <h1 style={titleStyle}>{title}</h1>
        <h1 style={subTitle}>{quantity}</h1>
    </div>

_SellerAndChargeRow.propTypes = {
    title: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired
}

export const SellerAndChargeRow = React.memo(_SellerAndChargeRow)