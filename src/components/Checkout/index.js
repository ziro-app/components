import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { useCard } from './utils/useCard'
import HeaderWithBack from '../HeaderWithBack/index'
import CreditCard from '../CreditCard/index'
import InputText from '../InputText/index'
import InputLabel from '../InputLabel/index'
import Dropdown from '../Dropdown/index'
import Icon from '../Icon/index'
import { Footer } from './Footer/index'
import { container, labelHeader, dual } from './styles'

const Checkout = () => {
	const [number, setNumber] = useState('')
	const [brand, numberMaskedCard, numberMaskedInput, expiryMasked, cvvMasked] = useCard(number)
	const [cardholder, setCardholder] = useState('')
	const [expiry, setExpiry] = useState('')
	const [cvv, setCvv] = useState('')
	const [installments, setInstallments] = useState('')
	return (
		<Fragment>
			<HeaderWithBack title='Pagamento' backUrl='/' />
			<div style={container}>
				<CreditCard
					number={numberMaskedCard}
					brand={brand}
					cardholder={cardholder}
					expiry={expiry}
					cvv={cvv}
				/>
				<div>
					<InputLabel name='Número do cartão' styleHeader={labelHeader} />
					<InputText
						value={numberMaskedInput}
						onChange={({ target: { value } }) => setNumber(value)}
						placeholder='1234 1234 1234 1234'
					/>
				</div>
				<div>
					<InputLabel name='Titular do cartão' styleHeader={labelHeader} />
					<InputText
						value={cardholder}
						onChange={({ target: { value } }) => setCardholder(value)}
						placeholder='Fernando(a) da Silva'
					/>
				</div>
				<div style={dual}>
					<div>
						<InputLabel name='Validade' styleHeader={labelHeader} />
						<InputText
							value={expiry}
							onChange={({ target: { value } }) => setExpiry(expiryMasked(value))}
							placeholder='01/20'
						/>
					</div>
					<div>
						<InputLabel name='CVV' styleHeader={labelHeader} />
						<InputText
							value={cvv}
							onChange={({ target: { value } }) => setCvv(cvvMasked(value))}
							placeholder='1111'
						/>
					</div>
				</div>
				<div>
					<InputLabel name='Parcelamento' styleHeader={labelHeader} />
					<Dropdown
						value={installments}
						onChange={(event) => {
							console.log(event)
							setInstallments(value)
						}}
					/>
				</div>
			</div>
			<Footer />
		</Fragment>
	)
}

Checkout.propTypes = {
}

export default Checkout