import React from 'react'
import PropTypes from 'prop-types'
import HeaderHome from '../HeaderHome/index'
import LoginForm from '../LoginForm/index'
import { welcome, subtitle, marker } from './styles'

const LoginPage = ({ audience, sendToBackend }) => {
	return (
		<>
			<HeaderHome linkPath='/cadastrar' linkText='Sem conta? CADASTRAR' />
			<h1 style={welcome}>
				<label style={subtitle}>Bem-vindo,&nbsp;</label>
				<label style={marker}>{audience}</label>
				<br/>Acesse sua conta,
			</h1>
			<LoginForm sendToBackend={sendToBackend} />
		</>
	)
}

LoginPage.propTypes = {
	audience: PropTypes.string.isRequired,
	sendToBackend: PropTypes.func.isRequired
}

export default LoginPage