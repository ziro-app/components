import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useBrand } from './utils/useBrand'
import CreditCard from '../CreditCard/index'
import InputText from '../InputText/index'
import { container } from './styles'

const Checkout = () => {
	const [number, setNumber] = useState('')
	const [brand, numberMaskedCard, numberMaskedInput] = useBrand(number)
	return (
		<div style={container}>
			<CreditCard
				number={numberMaskedCard}
				brand={brand}
			/>
			<InputText
				value={numberMaskedInput}
				onChange={({ target: { value } }) => setNumber(value)}
				placeholder='Número do cartão'
			/>
		</div>
	)
}

Checkout.propTypes = {
}

export default Checkout