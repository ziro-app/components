import React from 'react'
import PropTypes from 'prop-types'
import LoginForm from '../LoginForm/index'
import { title } from './styles'

const ResendEmail = ({ sendToBackend }) =>
	<>
		<h1 style={title}>Reenviar confirmação</h1>
		<LoginForm sendToBackend={sendToBackend} />
	</>

ResendEmail.propTypes = {
	sendToBackend: PropTypes.func.isRequired
}

export default ResendEmail