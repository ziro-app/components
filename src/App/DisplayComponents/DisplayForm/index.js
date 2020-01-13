import React, { useState } from 'react'
import Form from '../../../components/Form/index'
import FormInput from '../../../components/FormInput/index'
import InputText from '../../../components/InputText/index'
import { containerWithPadding } from '../../../Theme/variables'

export const DisplayForm = () => {
	const [email, setEmail] = useState('')
	const validations = [
		{
			name: 'email',
			validation: value => /^\S+@\S+\.\S+$/g.test(value), // tests for pattern a@b.c
			value: email,
			message: 'Formato inválido'
		}
	]
	return (
		<div style={containerWithPadding}>
			<Form
				validations={validations}
				sendToBackend={() => new Promise((res,rej) => res('Ok'))}
				inputs={[
					<FormInput name='email' label='Email' input={
						<InputText
							value={email}
							onChange={({ target: { value } }) => setEmail(value)}
							placeholder='Seu email'
						/>
					}/>
				]}
			/>
		</div>
	)
}