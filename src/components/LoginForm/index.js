import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Form from '../Form/index'
import FormInput from '../FormInput/index'
import InputText from '../InputText/index'
import InputEmail from '../InputEmail/index'

const LoginForm = ({ sendToBackend, history,error }) => {
	const [email, setEmail] = useState('')
	const [pass, setPass] = useState('')
	const state = { email, pass, setEmail, setPass, history }
	const validations = [
		{
			name: 'email',
			validation: value => /^\S+@\S+\.\S+$/g.test(value), // tests for pattern a@b.c
			value: email,
			message: 'Formato inválido'
		},
		{
			name: 'pass',
			validation: value => !/^.{0,5}$/g.test(value), // tests for min length of 6 char
			value: pass,
			message: 'Mínimo 6 caracteres'
		}
	]
	return (
		<Form
			error={error}
			validations={validations}
			sendToBackend={sendToBackend ? sendToBackend(state) : () => null}
			inputs={[
				<FormInput name='email' label='Email' input={
					<InputEmail
						value={email}
						setValue={setEmail}
					/>
				} />,
				<FormInput name='pass' label='Senha' input={
					<InputText
						value={pass}
						onChange={({ target: { value } }) => setPass(value)}
						placeholder='Sua senha'
						type='password'
					/>
				} />
			]}
		/>
	)
}

LoginForm.propTypes = {
	sendToBackend: PropTypes.func.isRequired
}

export default LoginForm
