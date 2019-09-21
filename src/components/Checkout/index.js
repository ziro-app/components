import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CreditCard from '../CreditCard/index'
import InputText from '../InputText/index'
import { container } from './styles'

const Checkout = () => {
	const [number, setNumber] = useState('')
	return (
		<div style={container}>
			<CreditCard
				number={number}
			/>
			<InputText
				value={number}
				onChange={({ target: { value } }) => setNumber(value)}
				placeholder='Número do cartão'
			/>
		</div>
	)
}

Checkout.propTypes = {
}

export default Checkout