import React from 'react'
import PropTypes from 'prop-types'
import currencyFormat from '@ziro/currency-format'
import { totalRow, middleItem } from './styles'

const _TotalRow = ({ totalValue }) => 
    <div style={totalRow}>
        <div/>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
            <h3 style={{ ...middleItem, textAlign: 'start' }}>total:</h3>
            <h3 style={{ ...middleItem, textAlign: 'end' }}>{ currencyFormat(totalValue) }</h3>
        </div>
    </div>

_TotalRow.PropTypes = {
    totalValue: PropTypes.string
}

export const TotalRow = React.memo(_TotalRow)