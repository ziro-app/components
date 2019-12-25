import React from 'react'
import HeaderHome from '../HeaderHome/index'
import LoginForm from '../LoginForm/index'
import { welcome, subtitle, marker } from './styles'

const LoginPage = () => {
	return (
		<>
			<HeaderHome linkPath='/cadastrar' linkText='Sem conta? CADASTRAR' />
			<h1 style={welcome}>
				<label style={subtitle}>Bem-vindo,&nbsp;</label>
				<label style={marker}>Afiliado</label>
				<br/>Acesse sua conta,
			</h1>
			<LoginForm />
		</>
	)
}

export default LoginPage