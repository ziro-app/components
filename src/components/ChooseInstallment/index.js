import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import currencyFormat from '@ziro/currency-format'
import { matchCreditCardBrand } from '../Checkout/utils/matchCreditCardBrand'
import Icon from '../Icon'
import Dropdown from '../Dropdown'
import { cardContainer, color } from '../ChooseCard/styles'
import { container, title, subTitle, doubleRow, tripleRow, middleItem, values, header, totalRow } from './styles'
import { useMemo } from 'react'

const quotient = (dividend, divisor) => parseInt((dividend/100/divisor).toFixed(2) * 100, 10)


const ChooseInstallment = ({ charge, maxInstallments, seller, cardNumber, onChange }) => {

    const brand = useMemo(() => {
        const _brand = matchCreditCardBrand(cardNumber)
        return _brand ? <Icon type={_brand} size={30} color={color}/> : <div style={{ width: 30, height: 30 }}/>
    }, [cardNumber])

    const installmentsOptions = useMemo(() => {
        const _installmentsOptions = []
        for(let i = 1;i<=maxInstallments;i++) _installmentsOptions.push(i)
        return _installmentsOptions
    },[maxInstallments])

    const [installments, setInstallments] = useState('1')
    const installmentValue = useMemo(() => quotient(charge,installments),[charge, installments])
    const totalValue = useMemo(() => installments*installmentValue, [installments, installmentValue])

    useEffect(() => onChange && onChange(installments), [installments])

    return (
        <div style={container}>
            <div style={doubleRow}>
                <h1 style={title}>{seller}</h1>
                <h1 style={subTitle}>{currencyFormat(charge)}</h1>
            </div>
            <h1 style={header}>Cartão</h1>
            <div style={cardContainer(true)}>
                    { brand }
                    <h2 style={{ color }}>{cardNumber}</h2>
            </div>
            <h1 style={header}>Parcelas</h1>
            <div style={tripleRow}>
                <Dropdown
                    readOnly={true}
                    value={installments}
                    onChange={({ target: { value } }) => setInstallments(value)}
                    list={installmentsOptions}
                    placeholder='X'
                    onChangeKeyboard={element => element ? setInstallments(element.value) : null }
                />
                <label style={middleItem}>{ installments === '' ? '' : installments === '1' ? 'vez de' : 'vezes de' }</label>
                <label style={{ ...values, textAlign: 'end' }}>{currencyFormat(installmentValue)}</label>
            </div>
            <div style={totalRow}>
                <div/>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                    <h3 style={{ ...middleItem, textAlign: 'start' }}>total:</h3>
                    <h3 style={{ ...middleItem, textAlign: 'end' }}>{ currencyFormat(totalValue) }</h3>
                </div>
            </div>
		</div>
    )
}

ChooseInstallment.propTypes = {
    seller: PropTypes.string.isRequired,
    charge: PropTypes.string.isRequired,
    maxInstallments: PropTypes.string.isRequired
}

export default ChooseInstallment