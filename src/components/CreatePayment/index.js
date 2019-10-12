import React, { useState } from 'react'
import currencyFormat from '@ziro/currency-format'
import maskInput from '@ziro/mask-input'
import { sendToBackend } from './sendToBackend'
import Form from '../Form/index'
import FormInput from '../FormInput/index'
import InputText from '../InputText/index'

const CreatePayment = () => {
	const [charge, setCharge] = useState('')
	const [maxInstallments, setMaxInstallments] = useState('')
	const validations = [
		{
			name: 'charge',
			validation: value => value > 9 && value <= 3000000,
			value: charge,
			message: 'Deve ser entre 0,10 e 30mil'
		},
		{
			name: 'maxInstallments',
			validation: value => /^[1-6]$/g.test(value),
			value: maxInstallments,
			message: 'Deve ser entre 1 e 6'
		}
	]
	return (
		<Form
			buttonName='Enviar formulário'
			validations={validations}
			sendToBackend={sendToBackend}
			inputs={[
				<FormInput
					name='Valor a cobrar'
					input={
						<InputText
							value={currencyFormat(charge)}
							onChange={({ target: { value } }) => {
								const toInteger = parseInt(value.replace(/[R$\.,]/g,''),10)
								return setCharge(maskInput(toInteger,'#######',true))
							}}
							placeholder='R$1.299,99'
						/>
					}
				/>,
				<FormInput
					name='Parcelamento máximo'
					input={
						<InputText
							value={maxInstallments}
							onChange={({ target: { value } }) => setMaxInstallments(maskInput(value, '#', true))}
							placeholder='6'
						/>
					}
				/>
			]}
		/>
	)
}

export default CreatePayment