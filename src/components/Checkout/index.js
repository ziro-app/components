import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useCard } from './utils/useCard'
import { useForm } from './utils/useForm'
import { installmentOptions } from './utils/installmentUtils'
import HeaderWithBack from '../HeaderWithBack/index'
import CreditCard from '../CreditCard/index'
import InputText from '../InputText/index'
import InputLabel from '../InputLabel/index'
import Dropdown from '../Dropdown/index'
import { Footer } from './Footer/index'
import { container, labelHeader, dual } from './styles'

const Checkout = ({ charge, maxInstallments, seller }) => {
	const [number, setNumber] = useState('')
	const [cardholder, setCardholder] = useState('')
	const [expiry, setExpiry] = useState('')
	const [cvv, setCvv] = useState('')
	const [cpf, setCpf] = useState('')
	const [installments, setInstallments] = useState('')
	const state = [number, cardholder, expiry, cvv, cpf, installments]
	const [brand, numberMaskedCard, numberMaskedInput, expiryMasked, cvvMasked, cpfMasked] = useCard(number)
	const [errors, submitting, submitForm] = useForm(state)
	return (
		<form onSubmit={submitting ? e => e.preventDefault() : submitForm}>
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
						value={number}
						onChange={({ target: { value } }) => setNumber(numberMaskedInput(value))}
						submitting={submitting}
						placeholder='1234 1234 1234 1234'
					/>
				</div>
				<div>
					<InputLabel name='Titular do cartão' styleHeader={labelHeader} />
					<InputText
						value={cardholder}
						onChange={({ target: { value } }) => setCardholder(value)}
						submitting={submitting}
						placeholder='Fernando(a) da Silva'
					/>
				</div>
				<div style={dual}>
					<div>
						<InputLabel name='Validade' styleHeader={labelHeader} />
						<InputText
							value={expiry}
							onChange={({ target: { value } }) => setExpiry(expiryMasked(value))}
							submitting={submitting}
							placeholder='01/24'
						/>
					</div>
					<div>
						<InputLabel name='CVV' styleHeader={labelHeader} />
						<InputText
							value={cvv}
							onChange={({ target: { value } }) => setCvv(cvvMasked(value))}
							submitting={submitting}
							placeholder='1111'
						/>
					</div>
				</div>
				<div>
					<InputLabel name='CPF do titular' styleHeader={labelHeader} />
					<InputText
						value={cpf}
						onChange={({ target: { value } }) => setCpf(cpfMasked(value))}
						submitting={submitting}
						placeholder='111.222.333-44'
					/>
				</div>
				<div>
					<InputLabel name='Parcelamento' styleHeader={labelHeader} />
					<Dropdown
						value={installments}
						onSelect={({ target: { value } }) => setInstallments(value.substring(0,1))}
						list={installmentOptions(charge, maxInstallments)}
						submitting={submitting}
						placeholder='Escolha quantas parcelas'
					/>
				</div>
			</div>
			<Footer charge={charge} installments={installments} seller={seller} submitting={submitting} />
		</form>
	)
}

Checkout.propTypes = {
	charge: PropTypes.string.isRequired,
	maxInstallments: PropTypes.string.isRequired,
	seller: PropTypes.string.isRequired
}

export default Checkout