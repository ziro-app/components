import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { SellerAndChargeRow } from '../SellerAndChargeRow'
import { CardRow } from '../ChooseCard/cardRow'
import { ChooseInstallmentRow } from './chooseInstallmentRow'
import { TotalRow } from './totalRow'
import { container, header } from './styles'
import format from '@ziro/currency-format'

const quotient = (dividend, divisor) => parseInt((dividend/100/divisor).toFixed(2) * 100, 10)

const ChooseInstallment = ({ charge, maxInstallments, seller, card, installments, setInstallments }) => {

    useEffect(() => { !installments && setInstallments('1') },[installments])

    const installmentsOptions = useMemo(() => {
        const _installmentsOptions = []
        for(let i = 1;i<=maxInstallments;i++) _installmentsOptions.push(`${i}`)
        return _installmentsOptions
    },[maxInstallments])

    const installmentValue = useMemo(() => `${quotient(charge,installments)}`,[charge, installments])
    const totalValue = useMemo(() => installments*installmentValue, [installments, installmentValue])

    return (
        <div style={container}>
            <SellerAndChargeRow title={seller} quantity={format(charge)}/>
            <h1 style={header}>Cartão</h1>
            <CardRow card={card} isSelected={false}/>
            <h1 style={header}>Parcelas</h1>
            <ChooseInstallmentRow
                installmentsOptions={installmentsOptions}
                installments={installments}
                installmentValue={installmentValue}
                setInstallments={setInstallments}
            />
            <TotalRow totalValue={totalValue}/>
		</div>
    )
}

ChooseInstallment.propTypes = {
    seller: PropTypes.string.isRequired,
    charge: PropTypes.string.isRequired,
    maxInstallments: PropTypes.string.isRequired,
    card: PropTypes.shape({ number: PropTypes.string.isRequired, status: PropTypes.string.isRequired }).isRequired,
    installments: PropTypes.string,
    setInstallments: PropTypes.func.isRequired
}

export default ChooseInstallment