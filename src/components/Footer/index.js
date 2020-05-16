import React from 'react'
import PropTypes from 'prop-types'
import { container, help } from './styles'

const Footer = ({ phone }) =>
	<div style={container}>
		<label style={help} onClick={() => window.open(`https://api.whatsapp.com/send?phone=${phone.replace(/\+|\s|\(|\)|-/g,'')}`, '_blank')}>
			Ajuda? Whats: {phone.substring(4)}
		</label>
	</div>

Footer.propTypes = {
	phone: PropTypes.string.isRequired
}

export default Footer