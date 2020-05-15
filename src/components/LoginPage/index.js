import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'wouter'
import HeaderHome from '../HeaderHome/index'
import LoginForm from '../LoginForm/index'
import { welcome, subtitle, marker, help } from './styles'

const LoginPage = ({ audience, sendToBackend, history = null }) => {
	return (
		<>
			<HeaderHome linkPath='/cadastrar' linkText='Sem conta? CADASTRAR' />
			<h1 style={welcome}>
				<label style={subtitle}>Bem-vindo,&nbsp;</label>
				<label style={marker}>{audience}</label>
				<br/>Acesse sua conta,
			</h1>
			<LoginForm sendToBackend={sendToBackend} history={history} />
			<Link href='/problemas-acesso'><a style={help}>Problemas no acesso?</a></Link>
		</>
	)
}

LoginPage.propTypes = {
	audience: PropTypes.string.isRequired,
	sendToBackend: PropTypes.func.isRequired
}

export default LoginPage
