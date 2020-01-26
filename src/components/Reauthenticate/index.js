import React from 'react'
import PropTypes from 'prop-types'
import Header from '../Header/index'
import LoginForm from '../LoginForm/index'
import { containerWithPadding } from '@ziro/theme'

const Reauthenticate = ({ sendToBackend }) =>
	<div style={containerWithPadding}>
		<Header type='icon-link' icon='back' navigateTo='/conta' title='Confirme credenciais' />
		<LoginForm sendToBackend={sendToBackend} />
	</div>

Reauthenticate.propTypes = {
	sendToBackend: PropTypes.func.isRequired
}

export default Reauthenticate