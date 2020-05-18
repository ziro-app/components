import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useCard } from './utils/useCard'
import CreditCard from '../CreditCard/index'
import FormInput from '../FormInput'
import InputText from '../InputText'
import FlowForm from '../FlowForm'
import Header from '../HeaderFlow'
import { container, dual } from './styles'
import { useHeader, useAnimatedLocation } from '../FlowManager'
import { useMemo } from 'react'

const FlowRegisterCard = ({ next, previous, header, initialNumber = '', initialCardHolder = '', initialExpiry = '', initialCvv = '' }) => {

	const [number, setNumber] = useState(initialNumber)
	const [cardholder, setCardholder] = useState(initialCardHolder)
	const [expiry, setExpiry] = useState(initialExpiry)
	const [cvv, setCvv] = useState(initialCvv)
	const [brand, numberMaskedCard, numberMaskedInput, expiryMasked, cvvMasked] = useCard(number)
	const state = useMemo(() => ({ number, cardholder, expiry, cvv, brand }),[number, cardholder, expiry, cvv, brand])

	const validations = useMemo(() => [
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
	],[number,cardholder,expiry,cvv])

	useHeader(
		<div style={{ height: 65+Math.min(window.innerWidth,300)/1.75 }}>
			{header}
			<CreditCard
				number={numberMaskedCard}
				brand={brand}
				cardholder={cardholder}
				expiry={expiry}
				cvv={cvv}
			/>
		</div>
	,[header, numberMaskedCard, brand, cardholder, expiry, cvv])

	const setLocation = useAnimatedLocation()[1]

	const _onNext = useCallback(async () => {
		const result = next.onClick && await next.onClick(state)
		next.location && setLocation('goLeft', next.location)
		return result
	},[next, state, setLocation])

	const _onPrevious = useCallback(async () => {
		const result = previous.onClick && await previous.onClick(state)
		previous.location && setLocation('converge', previous.location)
		return result
	},[previous, state, setLocation])

	return (
		<FlowForm
			next={_onNext}
			previous={_onPrevious}
			validations={validations}
			setError={(error) => console.log({ error })}
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