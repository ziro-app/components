import React, { useState } from 'react'
import Form from '../../../components/Form/index'
import FormInput from '../../../components/FormInput/index'
import InputText from '../../../components/InputText/index'
import { title } from './styles'

const ResendEmail = () => {
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
		<>
			<h1 style={title}>Reenviar confirmação</h1>
			<Form
				buttonOnTop={true}
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
		</>
	)
}

export default ResendEmail