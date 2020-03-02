import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useCard } from './utils/useCard'
import CreditCard from '../CreditCard/index'
import FlowForm from '../FlowForm/index'
import FormInput from '../FormInput/index'
import InputText from '../InputText/index'
import Modal from '../FlowModal'
import { useAnimatedLocation } from '../FlowManager'
import { container, dual } from './styles'
import { useCallback } from 'react'

const FlowRegisterCard = ({ next, previous }) => {

	const { onNext, onConverge, controls } = useAnimatedLocation()

	const [number, setNumber] = useState('')
	const [cardholder, setCardholder] = useState('')
	const [expiry, setExpiry] = useState('')
	const [cvv, setCvv] = useState('')
	const [brand, numberMaskedCard, numberMaskedInput, expiryMasked, cvvMasked] = useCard(number)
	const state = { number, cardholder, expiry, cvv, brand }

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

	const _onNext = useCallback(() => {
		const nextOnClick = async () => {
			return next.onClick && await next.onClick(state)
		}
		return onNext(nextOnClick, next.location)
	},[next, state, onNext])

	const _onPrevious = useCallback(() => {
		const previousOnClick = async () => {
			return previous.onClick && await previous.onClick(state)
		}
		return onConverge(previousOnClick, previous.location)
	},[previous, state, onConverge])

	const [error, setError] = useState()

	return (
		<>
			<FlowForm
				controls={controls}
				title='Registrar novo cartão'
				previous={_onPrevious}
				previousName={'voltar'}
				next={_onNext}
				nextName='próximo'
				validations={validations}
				setError={setError}
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
			<Modal
				isOpen={!!error}
				onRequestClose={() => setError()}
				errorTitle={'Ocorreu um problema'}
				errorMessage={'Não foi possível registrar o cartão, por favor tente novamente.'}
			/>
		</>
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