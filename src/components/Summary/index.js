import React from 'react'
import PropTypes from 'prop-types'
import currencyFormat from '@ziro/currency-format'
import Header from '../Header'
import { container, title, subTitle, doubleRow, tripleRow, separatorRow, separator, middleItem, values, content, header } from './styles'

const quotient = (dividend, divisor) => parseInt((dividend/100/divisor).toFixed(2) * 100, 10)

const Summary = ({ charge, maxInstallments, seller, misc }) => {
    return (
        <div style={container}>
            <div style={doubleRow}>
                <h1 style={title}>{seller}</h1>
                <h1 style={subTitle}>{currencyFormat(charge)}</h1>
            </div>
            <h1 style={header}>Parcelamento</h1>
            <div style={tripleRow}>
                <label style={values}>1</label>
                <label style={middleItem}>vez de</label>
                <label style={{ ...values, textAlign: 'end' }}>{currencyFormat(charge)}</label>
            </div>
            {
                maxInstallments > 1 &&
                [
                    <div key='separator' style={separatorRow}>
                        <div style={separator}/>
                        <label style={middleItem}>até</label>
                        <div style={separator}/>
                    </div>,
                    <div key='max' style={tripleRow}>
                        <label style={values}>{maxInstallments}</label>
                        <label style={middleItem}>vezes de</label>
                        <label style={{ ...values, textAlign: 'end' }}>{currencyFormat(quotient(charge,maxInstallments))}</label>
                    </div>
                ]
            }
            {
                misc &&
                [
                    <h1 style={header}>{misc.title}</h1>,
                    <div style={content}>{misc.text}</div>
                ]
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