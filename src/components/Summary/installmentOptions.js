import React from 'react'
import PropTypes from 'prop-types'
import currencyFormat from '@ziro/currency-format'
import { tripleRow, values, middleItem, separatorRow, separator } from './styles'

const quotient = (dividend, divisor) => parseInt((dividend/100/divisor).toFixed(2) * 100, 10)

const _IntallmentOption = ({ value, text, charge }) =>
    <div style={tripleRow}>
        <label style={values}>{ value }</label>
        <label style={middleItem}>{ text }</label>
        <label style={{ ...values, textAlign: 'end' }}>{currencyFormat(charge)}</label>
    </div>

_IntallmentOption.propTypes = {
    value: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    charge: PropTypes.string.isRequired
}

const InstallmentOption = React.memo(_IntallmentOption)

const _Separator = () =>
    <div style={separatorRow}>
        <div style={separator}/>
        <label style={middleItem}>até</label>
        <div style={separator}/>
    </div>

const Separator = React.memo(_Separator)

const _InstallmentOptions = ({ charge, maxInstallments }) =>
    <>
        <InstallmentOption value='1' text='vez de' charge={charge}/>
        {
            maxInstallments > 1 &&
            <>
                <Separator/>
                <InstallmentOption value={maxInstallments} text='vezes de' charge={`${quotient(charge, maxInstallments)}`}/>
            </>
        }
    </>

_InstallmentOptions.propTypes = {
    charge: PropTypes.string.isRequired,
    maxInstallments: PropTypes.string.isRequired
}

export const InstallmentOptions = React.memo(_InstallmentOptions)