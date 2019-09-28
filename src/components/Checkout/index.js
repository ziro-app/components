import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useBrand } from './utils/useBrand'
import CreditCard from '../CreditCard/index'
import InputText from '../InputText/index'
import InputLabel from '../InputLabel/index'
import Icon from '../Icon/index'
import { container, labelHeader } from './styles'

const Checkout = () => {
	const [number, setNumber] = useState('')
	const [brand, numberMaskedCard, numberMaskedInput] = useBrand(number)
	return (
		<div style={container}>
			<CreditCard
				number={numberMaskedCard}
				brand={brand}
			/>
			<div>
				<InputLabel name='Número do cartão' styleHeader={labelHeader} />
				<InputText
					value={numberMaskedInput}
					onChange={({ target: { value } }) => setNumber(value)}
					placeholder='1234 1234 1234 1234'
				/>
			</div>
		</div>
	)
}

Checkout.propTypes = {
}

export default Checkout