import React from 'react'
import PropTypes from 'prop-types'
import { container, help } from './styles'

const Footer = ({ phone }) =>
	<div style={container}>
		<label style={help} onClick={() => window.open('https://api.whatsapp.com/send?phone=551133340920', '_blank')}>
			Ajuda? Whats: {phone}
		</label>
	</div>

Footer.propTypes = {
	phone: PropTypes.string
}

export default Footer