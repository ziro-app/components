import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Header from '../Header/index'
import Form from '../Form/index'
import FormInput from '../FormInput/index'
import InputText from '../InputText/index'
import { containerWithPadding } from '@ziro/theme'

const ResetPass = ({ sendToBackend, navigateTo = '/conta',history = null }) => {
	const [email, setEmail] = useState('')
	const state = { email, setEmail, history }
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
			<Header type='icon-link' icon='back' navigateTo={navigateTo} title='Resetar senha' />
			<Form
				buttonOnTop={true}
				validations={validations}
				sendToBackend={sendToBackend ? sendToBackend(state) : () => null}
				inputs={[
					<FormInput name='email' label='Email' input={
						<InputText
							value={email}
							onChange={({ target: { value } }) => setEmail(value ? value.toLowerCase() : '')}
							placeholder='Seu email'
							inputMode='email'
							autoComplete='email'
						/>
					} />
				]}
			/>
		</div>
	)
}

ResetPass.propTypes = {
	sendToBackend: PropTypes.func.isRequired,
	navigateTo: PropTypes.string
}

export default ResetPass
