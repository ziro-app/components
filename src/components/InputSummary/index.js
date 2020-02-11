import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import currencyFormat from '@ziro/currency-format'
import Dropdown from '../Dropdown'
import { installmentCharge } from './installmentUtils'
import { summary, title, service, total, totalRow, sellerTitle, totalAfterInstallments, totalAfterInstallmentsTitle, installmentsRow, midText } from './styles'

const InputSummary = ({ charge, maxInstallments, seller, installments, setInstallments, installmentValue, setInstallmentValue }) => {

	useEffect(() => {
		setInstallmentValue(charge)
		setInstallments('1')
	},[])

	const [installmentsOptions] = useState(() => {
		let options = []
		for (let i = 1; i <= maxInstallments; i++)
			options.push(i)
		return options
	})

	return (
		<>
			<div style={summary}>
				<div style={sellerTitle}>{seller}</div>
				<div style={service}>
					<label>valor</label>
					<label style={total}>{currencyFormat(charge)}</label>
				</div>
				<label style={title}>parcelas</label>
				<div style={installmentsRow}>
					<Dropdown
						readOnly={true}
						value={installments}
						onChange={({ target: { value: _value } }) => {
							setInstallments(_value)
							setInstallmentValue(installmentCharge(charge,_value).toString())
						}}
						list={installmentsOptions}
						placeholder='1'
						onChangeKeyboard={element => element ? setInstallments(element.value) : null}
					/>
					<label style={midText}>{installments ? (installments == '1' ? 'vez' : 'vezes')+' de ' : ''}</label>
					<label style={total}>{currencyFormat(installmentValue)}</label>
				</div>
				<div style={totalRow}>
					<label style={totalAfterInstallmentsTitle}>total</label>
					<label style={totalAfterInstallments}>{currencyFormat(installmentValue*installments)}</label>
				</div>
			</div>
		</>
	)
}
	

InputSummary.propTypes = {
	charge: PropTypes.string.isRequired,
	maxInstallments: PropTypes.string.isRequired,
	seller: PropTypes.string.isRequired,
	installments: PropTypes.string.isRequired,
	setInstallments: PropTypes.func.isRequired,
	installmentValue: PropTypes.string.isRequired,
	setInstallmentValue: PropTypes.func.isRequired
}

export default InputSummary