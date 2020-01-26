import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Header from '../Header/index'
import Form from '../Form/index'
import FormInput from '../FormInput/index'
import InputText from '../InputText/index'
import { containerWithPadding } from '@ziro/theme'

const UpdatePass = ({ sendToBackend }) => {
	const [pass, setPass] = useState('')
	const [newPass, setNewPass] = useState('')
	const [confirmPass, setConfirmPass] = useState('')
	const state = { pass, newPass, setPass, setNewPass, setConfirmPass }
	const validations = [
		{
			name: 'pass',
			validation: value => !/^.{0,5}$/g.test(value), // tests for min length of 6 char
			value: pass,
			message: 'Mínimo 6 caracteres'
		},{
			name: 'newPass',
			validation: value => !/^.{0,5}$/g.test(value), // tests for min length of 6 char
			value: newPass,
			message: 'Mínimo 6 caracteres'
		},{
			name: 'confirmPass',
			validation: value => value === newPass,
			value: confirmPass,
			message: 'Deve ser igual ao campo anterior'
		}
	]
	return (
		<div style={containerWithPadding}>
			<Header type='icon-link' icon='back' navigateTo='/conta' title='Trocar senha' />
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
					}/>,
					<FormInput name='newPass' label='Nova senha' input={
						<InputText
							value={newPass}
							onChange={({ target: { value } }) => setNewPass(value)}
							placeholder='Sua nova senha'
							type='password'
						/>
					}/>,
					<FormInput name='confirmPass' label='Confirme nova senha' input={
						<InputText
							value={confirmPass}
							onChange={({ target: { value } }) => setConfirmPass(value)}
							placeholder='Senha do campo anterior'
							type='password'
						/>
					}/>
				]}
			/>
		</div>
	)
}

UpdatePass.propTypes = {
	sendToBackend: PropTypes.func.isRequired
}

export default UpdatePass