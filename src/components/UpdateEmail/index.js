import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Header from '../Header/index'
import Form from '../Form/index'
import FormInput from '../FormInput/index'
import InputText from '../InputText/index'
import { containerWithPadding } from '@ziro/theme'

const UpdateEmail = ({ sendToBackend }) => {
	const [pass, setPass] = useState('')
	const [newEmail, setNewEmail] = useState('')
	const state = { pass, newEmail }
	const validations = [
		{
			name: 'pass',
			validation: value => !/^.{0,5}$/g.test(value), // tests for min length of 6 char
			value: pass,
			message: 'Mínimo 6 caracteres'
		}, {
			name: 'newEmail',
			validation: value => /^\S+@\S+\.\S+$/g.test(value), // tests for pattern a@b.c
			value: newEmail,
			message: 'Formato inválido'
		}
	]
	return (
		<div style={containerWithPadding}>
			<Header type='icon-link' icon='back' navigateTo='/conta' title='Trocar Email' />
			<Form
				validations={validations}
				sendToBackend={sendToBackend ? sendToBackend(state) : () => null}
				inputs={[
					<FormInput name='pass' label='Senha atual' input={
						<InputText
							value={pass}
							onChange={({ target: { value } }) => setPass(value)}
							placeholder='Sua senha atual'
							type='password'
						/>
					} />,
					<FormInput name='newEmail' label='Novo email' input={
						<InputText
							value={newEmail}
							onChange={({ target: { value } }) => setNewEmail(value)}
							placeholder='Seu novo email'
						/>
					} />
				]}
			/>
		</div>
	)
}

UpdateEmail.propTypes = {
	/** Função executada quando o formulário é submetido. */
	sendToBackend: PropTypes.func.isRequired
}

export default UpdateEmail