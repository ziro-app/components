import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Header from '../Header/index'
import Form from '../Form/index'
import FormInput from '../FormInput/index'
import InputText from '../InputText/index'
import { containerWithPadding } from '@ziro/theme'

const UpdatePass = ({ sendToBackend }) => {
	const [pass, setPass] = useState('')
	const [confirmPass, setConfirmPass] = useState('')
	const state = { pass, setPass, setConfirmPass }
	const validations = [
		{
			name: 'pass',
			validation: value => !/^.{0,5}$/g.test(value), // tests for min length of 6 char
			value: pass,
			message: 'Mínimo 6 caracteres'
		},{
			name: 'confirmPass',
			validation: value => value === pass,
			value: confirmPass,
			message: 'Deve ser igual ao campo anterior'
		}
	]
	return (
		<div style={containerWithPadding}>
			<Header type='icon-link' icon='back' navigateTo='/conta' title='Atualizar senha' />
			<Form
				buttonOnTop={true}
				validations={validations}
				sendToBackend={sendToBackend ? sendToBackend(state) : () => null}
				inputs={[
					<FormInput name='pass' label='Nova senha' input={
						<InputText
							value={pass}
							onChange={({ target: { value } }) => setPass(value)}
							placeholder='Sua nova senha'
							type='password'
						/>
					}/>,
					<FormInput name='confirmPass' label='Confirme a senha' input={
						<InputText
							value={confirmPass}
							onChange={({ target: { value } }) => setConfirmPass(value)}
							placeholder='Mínimo 6 caracteres'
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