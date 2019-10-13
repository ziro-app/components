import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useCard } from './utils/useCard'
import { installmentOptions } from './utils/installmentUtils'
// import { validations } from './utils/validations'
import Header from '../Header/index'
import CreditCard from '../CreditCard/index'
import Form from '../Form/index'
import FormInput from '../FormInput/index'
import InputText from '../InputText/index'
import Dropdown from '../Dropdown/index'
import { Footer } from './Footer/index'
import { Submit } from './Submit/index'
import { container, labelHeader, dual, errorBlock, errorMsg } from './styles'

const Checkout = ({ charge, maxInstallments, seller }) => {
	const [number, setNumber] = useState('')
	const [cardholder, setCardholder] = useState('')
	const [expiry, setExpiry] = useState('')
	const [cvv, setCvv] = useState('')
	const [cpf, setCpf] = useState('')
	const [installments, setInstallments] = useState('')
	const [modal, setModal] = useState(false)
	const [brand, numberMaskedCard, numberMaskedInput, expiryMasked, cvvMasked, cpfMasked] = useCard(number)
	const validations = [
		{
			name: 'number',
			validation: value => !!value && value.replace(/\s/g, '').length >= 12,
			value: number,
			message: 'Verifique o número digitado'
		},
		{
			name: 'cardholder',
			validation: value => !!value,
			value: cardholder,
			message: 'Campo obrigatório'
		},
		{
			name: 'expiry',
			validation: value => !!value && value.length === 5,
			value: expiry,
			message: 'Verifique a validade'
		},
		{
			name: 'cvv',
			validation: value => !!value && value.length >= 3,
			value: cvv,
			message: 'Verifique o código atrás do cartão'
		},
		{
			name: 'cpf',
			validation: value => !!value && value.length === 14,
			value: cpf,
			message: 'Deve conter 11 dígitos'
		},
		{
			name: 'installments',
			validation: value => !!value,
			value: installments,
			message: 'Campo obrigatório'
		}
	]
	return (
		<>
			<Header type='title-only' title='Pagamento' />
			<CreditCard
				number={numberMaskedCard}
				brand={brand}
				cardholder={cardholder}
				expiry={expiry}
				cvv={cvv}
			/>
			<Form
				buttonName='Confirmar'
				validations={validations}
				sendToBackend={() => new Promise((resolve, reject) => setTimeout(() => resolve('OK'), 1000))}
				inputs={[
					<FormInput
						name='number'
						label='Número do cartão'
						input={
							<InputText
								value={number}
								onChange={({ target: { value } }) => setNumber(numberMaskedInput(value))}
								placeholder='1234 1234 1234 1234'
							/>
						}
					/>,
					<FormInput
						name='cardholder'
						label='Titular do cartão'
						input={
							<InputText
								value={cardholder}
								onChange={({ target: { value } }) => setCardholder(value)}
								placeholder='Fernando(a) da Silva'
							/>
						}
					/>,
					<FormInput
						name='expiry'
						label='Validade'
						input={
							<InputText
								value={expiry}
								onChange={({ target: { value } }) => setExpiry(expiryMasked(value))}
								placeholder='01/24'
							/>
						}
					/>,
					<FormInput
						name='cvv'
						label='CVV'
						input={
							<InputText
								value={cvv}
								onChange={({ target: { value } }) => setCvv(cvvMasked(value))}
								placeholder='1111'
							/>
						}
					/>,
					<FormInput
						name='cpf'
						label='CPF do titular'
						input={
							<InputText
								value={cpf}
								onChange={({ target: { value } }) => setCpf(cpfMasked(value))}
								placeholder='111.222.333-44'
							/>
						}
					/>,
					<FormInput
						name='installments'
						label='Parcelamento'
						input={
							<Dropdown
								value={installments}
								onChange={({ target: { value } }) => setInstallments(value.substring(0,1))}
								list={installmentOptions(charge, maxInstallments)}
								placeholder='Escolha quantas parcelas'
							/>
						}
					/>,
				]}
			/>

		</>
	)
}

Checkout.propTypes = {
	charge: PropTypes.string.isRequired,
	maxInstallments: PropTypes.string.isRequired,
	seller: PropTypes.string.isRequired
}

export default Checkout