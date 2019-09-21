import React from 'react'
import PropTypes from 'prop-types'
import { card, chip, number, info, header } from './styles'

const CreditCard = () =>
	<div style={card}>
		<div style={chip}></div>
		<div style={number}>1234 1234 1234 1234</div>
		<div style={info}>
			<div style={header}>Titular</div>
			<div style={header}>Vencimento</div>
			<div style={header}>Cvv</div>
		</div>
	</div>

CreditCard.propTypes = {
}

export default CreditCard