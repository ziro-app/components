import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useCard } from './utils/useCard'
import { useForm } from './utils/useForm'
import { installmentOptions } from './utils/installmentUtils'
import Header from '../Header/index'
import CreditCard from '../CreditCard/index'
import InputText from '../InputText/index'
import InputLabel from '../InputLabel/index'
import Dropdown from '../Dropdown/index'
import Icon from '../Icon/index'
import { Footer } from './Footer/index'
import { Submit } from './Submit/index'
import { alertColor } from '../../Theme/variables'
import { container, labelHeader, dual, errorBlock, errorMsg } from './styles'

const Checkout = ({ charge, maxInstallments, seller }) => {
	const [number, setNumber] = useState('')
	const [cardholder, setCardholder] = useState('')
	const [expiry, setExpiry] = useState('')
	const [cvv, setCvv] = useState('')
	const [cpf, setCpf] = useState('')
	const [installments, setInstallments] = useState('')
	const [modal, setModal] = useState(false)
	const state = [number, cardholder, expiry, cvv, cpf, installments]
	const [brand, numberMaskedCard, numberMaskedInput, expiryMasked, cvvMasked, cpfMasked] = useCard(number)
	const [hasError, errors, submitting, submitForm, submitError] = useForm(state, setModal)
	return (
		<form onSubmit={submitting ? e => e.preventDefault() : submitForm}>
			<Header type='title-only' title='Pagamento' />
			<div style={container}>
				<CreditCard
					number={numberMaskedCard}
					brand={brand}
					cardholder={cardholder}
					expiry={expiry}
					cvv={cvv}
				/>
				<div>
					<InputLabel
						name='Número do cartão'
						styleHeader={labelHeader}
						badge={<Icon type='alert' size={13} strokeWidth={3} color={alertColor} />}
						hasBadge={!!hasError && !errors.numberIsValid}
					/>
					<InputText
						value={number}
						onChange={({ target: { value } }) => setNumber(numberMaskedInput(value))}
						submitting={submitting}
						placeholder='1234 1234 1234 1234'
					/>
				</div>
				<div>
					<InputLabel
						name='Titular do cartão'
						styleHeader={labelHeader}
						badge={<Icon type='alert' size={13} strokeWidth={3} color={alertColor} />}
						hasBadge={!!hasError && !errors.cardholderIsValid}
					/>
					<InputText
						value={cardholder}
						onChange={({ target: { value } }) => setCardholder(value)}
						submitting={submitting}
						placeholder='Fernando(a) da Silva'
					/>
				</div>
				<div style={dual}>
					<div>
						<InputLabel
							name='Validade'
							styleHeader={labelHeader}
							badge={<Icon type='alert' size={13} strokeWidth={3} color={alertColor} />}
							hasBadge={!!hasError && !errors.expiryIsValid}
						/>
						<InputText
							value={expiry}
							onChange={({ target: { value } }) => setExpiry(expiryMasked(value))}
							submitting={submitting}
							placeholder='01/24'
						/>
					</div>
					<div>
						<InputLabel
							name='CVV'
							styleHeader={labelHeader}
							badge={<Icon type='alert' size={13} strokeWidth={3} color={alertColor} />}
							hasBadge={!!hasError && !errors.cvvIsValid}
						/>
						<InputText
							value={cvv}
							onChange={({ target: { value } }) => setCvv(cvvMasked(value))}
							submitting={submitting}
							placeholder='1111'
						/>
					</div>
				</div>
				<div>
					<InputLabel
						name='CPF do titular'
						styleHeader={labelHeader}
						badge={<Icon type='alert' size={13} strokeWidth={3} color={alertColor} />}
						hasBadge={!!hasError && !errors.cpfIsValid}
					/>
					<InputText
						value={cpf}
						onChange={({ target: { value } }) => setCpf(cpfMasked(value))}
						submitting={submitting}
						placeholder='111.222.333-44'
					/>
				</div>
				<div>
					<InputLabel
						name='Parcelamento'
						styleHeader={labelHeader}
						badge={<Icon type='alert' size={13} strokeWidth={3} color={alertColor} />}
						hasBadge={!!hasError && !errors.installmentsIsValid}
					/>
					<Dropdown
						value={installments}
						onChange={({ target: { value } }) => setInstallments(value.substring(0,1))}
						list={installmentOptions(charge, maxInstallments)}
						submitting={submitting}
						placeholder='Escolha quantas parcelas'
					/>
				</div>
			</div>
			<label style={errorBlock}>
				<div style={errorMsg}>
					{!!hasError && <Icon type='alert' size={13} strokeWidth={3} color={alertColor} />}&nbsp;{hasError}
				</div>
			</label>
			<Footer charge={charge} installments={installments} seller={seller} submitting={submitting} />
			<Submit submitting={submitting} modal={modal} setModal={setModal} error={submitError} />
		</form>
	)
}

Checkout.propTypes = {
	charge: PropTypes.string.isRequired,
	maxInstallments: PropTypes.string.isRequired,
	seller: PropTypes.string.isRequired
}

export default Checkout