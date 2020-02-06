import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Header from '../Header/index'
import Form from '../Form/index'
import FormInput from '../FormInput/index'
import InputText from '../InputText/index'
import { containerWithPadding } from '@ziro/theme'

const ResetPass = ({ sendToBackend }) => {
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
		<div style={containerWithPadding}>
			<Header type='icon-link' icon='back' navigateTo='/' title='Resetar senha' />
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
					} />
				]}
			/>
		</div>
	)
}

ResetPass.propTypes = {
	 submetido. */
	sendToBackend: PropTypes.func.isRequired
}

export default ResetPass