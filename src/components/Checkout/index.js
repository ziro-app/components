import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useBrand } from './utils/useBrand'
import CreditCard from '../CreditCard/index'
import InputText from '../InputText/index'
import Icon from '../Icon/index'
import { container, wrapper, label } from './styles'

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
				<div style={wrapper}>
					<label style={label}>Número do cartão</label>
				</div>
				<InputText
					value={numberMaskedInput}
					onChange={({ target: { value } }) => setNumber(value)}
					placeholder='1234 1234 1234 1234'
				/>
			</div>
			<div>
				<div style={wrapper}>
					<label style={label}>Titular do cartão</label>
				</div>
				<InputText
					value={null}
					onChange={() => null}
					placeholder='Fernando(a) da Silva'
				/>
			</div>
			<div>
				<div style={wrapper}>
					<label style={label}>CPF do Titular</label>
				</div>
				<InputText
					value={null}
					onChange={() => null}
					placeholder='111.222.333-44'
				/>
			</div>
		</div>
	)
}

Checkout.propTypes = {
}

export default Checkout