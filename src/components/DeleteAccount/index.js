import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Header from '../Header/index'
import Form from '../Form/index'
import FormInput from '../FormInput/index'
import InputText from '../InputText/index'
import { containerWithPadding } from '@ziro/theme'

const DeleteAccount = ({ sendToBackend }) => {
	const [pass, setPass] = useState('')
	const state = { pass }
	const validations = [
		{
			name: 'pass',
			validation: value => !/^.{0,5}$/g.test(value), // tests for min length of 6 char
			value: pass,
			message: 'Mínimo 6 caracteres'
		}
	]
	return (
		<div style={containerWithPadding}>
			<Header type='icon-link' icon='back' navigateTo='/conta' title='Deletar Conta' />
			<Form
				buttonOnTop={true}
				buttonName='Confirmar exclusão'
				validations={validations}
				sendToBackend={sendToBackend ? sendToBackend(state) : () => null}
				inputs={[
					<FormInput name='pass' label='Senha' input={
						<InputText
							value={pass}
							onChange={({ target: { value } }) => setPass(value)}
							placeholder='Sua senha'
							type='password'
						/>
					}/>
				]}
			/>
		</div>
	)
}

DeleteAccount.propTypes = {
	sendToBackend: PropTypes.func.isRequired
}

export default DeleteAccount