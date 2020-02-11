import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import currencyFormat from '@ziro/currency-format'
import Dropdown from '../Dropdown'
import { installmentCharge } from './installmentUtils'
import { summary, title, service, total, totalRow, sellerTitle, totalAfterInstallments, totalAfterInstallmentsTitle, installmentsRow, midText } from './styles'

const Summary = ({ charge, maxInstallments, seller, onChange }) => {
	const [installments, setInstallments] = useState('1')
	const [installmentsOptions] = useState(() => {
		let options = []
		for (let i = 1; i <= maxInstallments; i++)
			options.push(i)
		return options
	})
	const [value, setValue] = useState(charge)

	useEffect(() => {
		onChange && onChange({ installments, installmentValue: value })
	},[installments,value])

	return (
		<>
			<div style={summary}>
				<div style={title}>Resumo da fatura</div>
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
							setValue(installmentCharge(charge,_value))
						}}
						list={installmentsOptions}
						placeholder='1'
						onChangeKeyboard={element => element ? setInstallments(element.value) : null}
					/>
					<label style={midText}>{installments ? (installments == '1' ? 'vez' : 'vezes')+' de ' : ''}</label>
					<label style={total}>{currencyFormat(value)}</label>
				</div>
				<div style={totalRow}>
					<label style={totalAfterInstallmentsTitle}>total</label>
					<label style={totalAfterInstallments}>{currencyFormat(value*installments)}</label>
				</div>
			</div>
		</>
	)
}
	

Summary.propTypes = {
	charge: PropTypes.string.isRequired,
	maxInstallments: PropTypes.string.isRequired,
	seller: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
}

export default Summary