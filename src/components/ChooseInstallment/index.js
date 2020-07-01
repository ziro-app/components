import React, { useMemo, useEffect } from 'react'
import { string, func } from 'prop-types'
import { SellerAndChargeRow } from '../SellerAndChargeRow'
import { ChooseInstallmentRow } from './chooseInstallmentRow'
import { container } from './styles'
import format from '@ziro/currency-format'

const createArray = number => Array.from(Array(parseInt(number)).keys()).map(i=>(i+1).toString())
const quotient = (dividend, divisor) => parseInt((dividend/100/divisor).toFixed(2) * 100, 10)

const ChooseInstallment = ({ charge, maxInstallments, seller, installments, setInstallments }) => {

    const installmentsOptions = useMemo(() => createArray(maxInstallments),[maxInstallments])
    const installmentValue = useMemo(() => `${quotient(charge,installments)}`,[charge, installments])
    const isValid = useMemo(() => installmentsOptions.includes(installments), [installmentsOptions, installments])
    useEffect(() => {
        if (Number(installments) > Number(maxInstallments)) setInstallments(maxInstallments)
        if (Number(installments) === 0) setInstallments('')
    }, [installments, maxInstallments])
    return (
        <div style={container}>
            <SellerAndChargeRow title={seller} quantity={format(charge)}/>
            <label>{`Escolha as parcelas (até ${maxInstallments}x)`}</label>
            <ChooseInstallmentRow
                installmentsOptions={installmentsOptions}
                installments={installments}
                installmentValue={installmentValue}
                setInstallments={setInstallments}
            />
		</div>
    )
}

ChooseInstallment.propTypes = {
    seller: string.isRequired,
    charge: string.isRequired,
    maxInstallments: string.isRequired,
    installments: string,
    setInstallments: func.isRequired
}

export default ChooseInstallment