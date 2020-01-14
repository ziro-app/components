import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Form from '../Form/index'
import FormInput from '../FormInput/index'
import InputText from '../InputText/index'
import { title } from './styles'

const ResendEmail = ({ sendToBackend }) => {
	const [email, setEmail] = useState('')
	const state = { email, setEmail }
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
				sendToBackend={sendToBackend ? sendToBackend(state) : () => null}
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

ResendEmail.propTypes = {
	sendToBackend: PropTypes.func.isRequired
}

export default ResendEmail