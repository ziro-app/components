import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'wouter'
import Header from '../Header/index'
import LoginForm from '../LoginForm/index'
import { help } from './styles'
import { containerWithPadding } from '@ziro/theme'

const ResendEmail = ({ sendToBackend, navigateTo = '/conta' }) =>
	<div style={containerWithPadding}>
		<Header type='icon-link' icon='back' navigateTo={navigateTo} title='Reenviar confirmação' />
		<LoginForm sendToBackend={sendToBackend} />
		<Link href='/problemas-acesso'><a style={help}>Problemas no acesso?</a></Link>
	</div>

ResendEmail.propTypes = {
	sendToBackend: PropTypes.func.isRequired,
	navigateTo: PropTypes.string
}

export default ResendEmail