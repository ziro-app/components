import React from 'react'
import currencyFormat from '@ziro/currency-format'
import { container, title, subTitle, doubleRow, tripleRow, separatorRow, leadingItem, middleItem, trailingItem, values } from './styles'

const quotient = (dividend, divisor) => parseInt((dividend/100/divisor).toFixed(2) * 100, 10)

const Summary = ({ charge, maxInstallments, seller, misc }) => {
    return (
        <>
			<div style={container}>
				<div style={title}>{seller}</div>
                <div style={container}>
                    <div style={doubleRow}>
                        <label style={leadingItem}>valor</label>
                        <label style={subTitle}>{currencyFormat(charge)}</label>
                    </div>
                    <label style={subTitle}>Opções de parcelamento</label>
                    <div style={tripleRow}>
                        <label style={subTitle}>{1}</label>
                        <label style={middleItem}>{'vez de'}</label>
                        <label style={{ ...values, textAlign: 'end' }}>{currencyFormat(charge)}</label>
                    </div>
                    {
                        maxInstallments > 1 &&
                        [
                            <div style={separatorRow}>
                                <div style={{ height: '1px', margin: '10px', background: '#e0e0e0'}}/>
                                <label style={middleItem}>{'até'}</label>
                                <div style={{ height: '1px', margin: '10px', background: '#e0e0e0'}}/>
                            </div>,
                            <div style={tripleRow}>
                                <label style={subTitle}>{maxInstallments}</label>
                                <label style={middleItem}>{'vezes de'}</label>
                                <label style={{ ...values, textAlign: 'end' }}>{currencyFormat(quotient(charge,maxInstallments))}</label>
                            </div>
                        ]
                    }
                    {
                        misc &&
                        [
                            <label style={subTitle}>{misc.title}</label>,
                            <label style={{ padding: '20px' }}>{misc.text}</label>
                        ]
                    }
                </div>
			</div>
		</>
    )
}

export default Summary