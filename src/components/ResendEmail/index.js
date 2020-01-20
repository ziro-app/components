import React from 'react'
import PropTypes from 'prop-types'
import Header from '../Header/index'
import LoginForm from '../LoginForm/index'
import { help } from './styles'

const ResendEmail = ({ sendToBackend }) =>
	<>
		<Header type='icon-link' icon='back' navigateTo='/' title='Reenviar confirmação' />
		<LoginForm sendToBackend={sendToBackend} />
		<label style={help}>Problemas no acesso?</label>
	</>

ResendEmail.propTypes = {
	sendToBackend: PropTypes.func.isRequired
}

export default ResendEmail