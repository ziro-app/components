import React, { useState } from 'react'
import PropTypes from 'prop-types'
import maskInput from '@ziro/mask-input'
import { matchCreditCardBrand } from './utils/matchCreditCardBrand'
import CreditCard from '../CreditCard/index'
import InputText from '../InputText/index'
import { container } from './styles'

const Checkout = () => {
	const [number, setNumber] = useState('')
	const maskByBrand = (number, brand) => {
		if (brand === 'amex')
			return maskInput(number,'#### ###### #####',true)
		if (brand === 'visa' || brand === 'mastercard')
			return maskInput(number, '#### #### #### #######')
		return maskInput(number,'#### #### #### ####',true)
	}
	return (
		<div style={container}>
			<CreditCard
				number={number.replace(/\s/g, '')}
				brand={matchCreditCardBrand(number)}
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