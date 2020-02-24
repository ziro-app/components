import React from 'react'
import { Link } from 'wouter'
import PropTypes from 'prop-types'
import { container, instructions, optionStyle } from './styles'

const Submenu = ({ options }) =>
	<div style={container}>
		<label style={instructions}>Escolha a ferramenta desejada</label>
		{options.map(option =>
			<Link><a style={optionStyle}>{option}</a></Link>
		)}
	</div>

Submenu.propTypes = {
	options: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired
}

export default Submenu