import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useCard } from './utils/useCard'
import CreditCard from '../CreditCard/index'
import FlowForm from '../FlowForm/index'
import FormInput from '../FormInput/index'
import InputText from '../InputText/index'
import { useAnimatedLocation } from '../FlowManager'
import { SuccessModal } from './ModalSubmit/SuccessModal'
import { ErrorModal } from './ModalSubmit/ErrorModal'
import { container, dual } from './styles'

const FlowRegisterCard = ({ next, previous }) => {

	const [number, setNumber] = useState('')
	const [cardholder, setCardholder] = useState('')
	const [expiry, setExpiry] = useState('')
	const [cvv, setCvv] = useState('')
	const [brand, numberMaskedCard, numberMaskedInput, expiryMasked, cvvMasked] = useCard(number)
	const state = { number, cardholder, expiry, cvv, brand }

	const [onNext, onPrevious, onDiverge, onConverge, controls] = useAnimatedLocation()

	const validations = [
		{
			name: 'number',
			validation: value => !!value && value.replace(/\s/g, '').length >= 12,
			value: number,
			message: 'Revise número digitado'
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
			message: 'Revise campo'
		},
		{
			name: 'cvv',
			validation: value => !!value && value.length >= 3,
			value: cvv,
			message: 'Revise campo'
		},
	]
	return (
			<FlowForm
				controls={controls}
				title='Registrar novo cartão'
				previous={() => onConverge(previous.onClick && previous.onClick(state), previous.location)}
				previousName={'voltar'}
				useModalLayoutOnSubmit={true}
				successComponent={() => <SuccessModal />}
				errorComponent={props => <ErrorModal closeModal={props} />}
				buttonName='próximo'
				validations={validations}
				next={() => onNext(next.onClick && next.onClick(state),next.location)}
				topView={
					<CreditCard
						number={numberMaskedCard}
						brand={brand}
						cardholder={cardholder}
						expiry={expiry}
						cvv={cvv}
					/>
				}
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
					<div style={dual}>
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
						/>
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
						/>
					</div>
				]}
			/>
	)
}

FlowRegisterCard.propTypes = {
	next: PropTypes.shape({
		onClick: PropTypes.func,
		location: PropTypes.string
	}).isRequired,
	previous: PropTypes.shape({
		onClick: PropTypes.func,
		location: PropTypes.string
	}).isRequired
}

export default FlowRegisterCard