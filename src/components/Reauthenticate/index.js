import React from 'react'
import PropTypes from 'prop-types'
import Header from '../Header/index'
import LoginForm from '../LoginForm/index'

const Reauthenticate = ({ sendToBackend }) =>
	<>
		<Header type='icon-link' icon='back' navigateTo='/conta' title='Confirme credenciais' />
		<LoginForm sendToBackend={sendToBackend} />
	</>

Reauthenticate.propTypes = {
	sendToBackend: PropTypes.func.isRequired
}

export default Reauthenticate