import React from 'react'
import PropTypes from 'prop-types'
import { container, help } from './styles'

const Footer = ({ phone }) =>
	<div style={container}>
		<label style={help}>Ajuda? Whats: {phone}</label>
	</div>

Footer.propTypes = {
	phone: PropTypes.string
}

export default Footer