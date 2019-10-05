import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import currencyFormat from '@ziro/currency-format'
import { installmentCharge } from '../utils/installmentUtils'
import Button from '../../Button/index'
import { container, summary, title, service, total, amount, regulatory, info } from './styles'

export const Footer = ({ charge, installments }) => {
	return (
		<div style={container}>
			<div style={summary}>
				<div style={title}>Resumo do pagamento</div>
				<div style={service}>
					<label>Crisfael</label>
					<label style={total}>{currencyFormat(charge * 100)}</label>
				</div>
				<label style={amount}>&nbsp;{installments && `${installments} de ${installmentCharge(charge, installments)}`}</label>
			</div>
			<Button />
			<div style={regulatory}>
				<label style={info}>ZIRO: 28.026.371/0001-61</label>
			</div>
		</div>
	)
}

Footer.propTypes = {
	charge: PropTypes.string.isRequired,
	installments: PropTypes.string.isRequired
}