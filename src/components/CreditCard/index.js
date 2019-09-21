import React from 'react'
import PropTypes from 'prop-types'
import { card, chip, number, info, header } from './styles'

const CreditCard = () =>
	<div style={card}>
		<div style={chip}></div>
		<label style={number}>
			<span>1234</span>
			<span>1234</span>
			<span>1234</span>
			<span>1234</span>
		</label>
		<div style={info}>
			<label style={header}>Vitor A Barbosa</label>
			<label style={header}>11/24</label>
			<label style={header}>111</label>
		</div>
	</div>

CreditCard.propTypes = {
}

export default CreditCard