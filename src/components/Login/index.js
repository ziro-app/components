import React from 'react'
import FormInput from '../FormInput/index'
import InputText from '../InputText/index'

const Login = () => {
	return (
		<FormInput label='Email' input={
			<InputText />
		} />
	)
}

export default Login