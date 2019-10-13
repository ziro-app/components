import React from 'react'
import PropTypes from 'prop-types'
import currencyFormat from '@ziro/currency-format'
import { installmentCharge } from '../utils/installmentUtils'
import { container, summary, title, service, total, amount } from './styles'

export const Summary = ({ charge, installments, seller }) =>
	<div style={container}>
		<div style={summary}>
			<div style={title}>Resumo do pagamento</div>
			<div style={service}>
				<label>{seller}</label>
				<label style={total}>{currencyFormat(charge)}</label>
			</div>
			<label style={amount}>
				&nbsp;{installments && `${installments}x de ${installmentCharge(charge, installments)}`}
			</label>
		</div>
	</div>

Summary.propTypes = {
	charge: PropTypes.string.isRequired,
	installments: PropTypes.string.isRequired,
	seller: PropTypes.string.isRequired
}