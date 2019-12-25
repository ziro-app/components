import React, { useState } from 'react'
import Form from '../Form/index'
import FormInput from '../FormInput/index'
import InputText from '../InputText/index'

const Login = () => {
	const [email, setEmail] = useState('')
	return (
		<Form
			validations={[]}
			sendToBackend={() => console.log('submit')}
			inputs={[
				<FormInput label='Email' input={
					<InputText
						value={email}
						onChange={({ target: { value } }) => setEmail(value)}
						placeholder='Seu email'
					/>
				}/>
			]}
		/>
	)
}

export default Login