import React from 'react'
import PropTypes from 'prop-types'
import InputText from '../InputText/index'
import CreditCard from '../CreditCard/index'
import { container } from './styles'

const Checkout = () =>
	<div style={container}>
		<CreditCard />
		<InputText />
	</div>

Checkout.propTypes = {
}

export default Checkout