import React from 'react'
import PropTypes from 'prop-types'
import currencyFormat from '@ziro/currency-format'
import { container, title, subTitle, doubleRow, tripleRow, separatorRow, separator, middleItem, values } from './styles'

const quotient = (dividend, divisor) => parseInt((dividend/100/divisor).toFixed(2) * 100, 10)

const Summary = ({ charge, maxInstallments, seller, misc }) => {
    return (
        <>
			<div style={container}>
				<div style={title}>{seller}</div>
                <div style={container}>
                    <div style={doubleRow}>
                        <label>valor</label>
                        <label style={subTitle}>{currencyFormat(charge)}</label>
                    </div>
                    <label style={subTitle}>Opções de parcelamento</label>
                    <div style={tripleRow}>
                        <label style={values}>{1}</label>
                        <label style={middleItem}>{'vez de'}</label>
                        <label style={{ ...values, textAlign: 'end' }}>{currencyFormat(charge)}</label>
                    </div>
                    {
                        maxInstallments > 1 &&
                        [
                            <div key='separator' style={separatorRow}>
                                <div style={separator}/>
                                <label style={middleItem}>{'até'}</label>
                                <div style={separator}/>
                            </div>,
                            <div key='max' style={tripleRow}>
                                <label style={values}>{maxInstallments}</label>
                                <label style={middleItem}>{'vezes de'}</label>
                                <label style={{ ...values, textAlign: 'end' }}>{currencyFormat(quotient(charge,maxInstallments))}</label>
                            </div>
                        ]
                    }
                    {
                        misc &&
                        [
                            <label style={subTitle}>{misc.title}</label>,
                            <label style={container}>{misc.text}</label>
                        ]
                    }
                </div>
			</div>
		</>
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