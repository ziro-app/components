import React from 'react'
import PropTypes from 'prop-types'
import Header from '../Header/index'
import LoginForm from '../LoginForm/index'

const ResendEmail = ({ sendToBackend }) =>
	<>
		<Header type='icon-link' icon='back' navigateTo='/' title='Reenviar confirmação' />
		<LoginForm sendToBackend={sendToBackend} />
	</>

ResendEmail.propTypes = {
	sendToBackend: PropTypes.func.isRequired
}

export default ResendEmail