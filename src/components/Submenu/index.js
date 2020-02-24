import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'wouter'
import { container, instructions, optionStyle } from './styles'

const Submenu = ({ options }) =>
	<div style={container}>
		<label style={instructions}>Escolha a ferramenta desejada</label>
		{options.map(([ name, path], index) =>
			<Link href={path} key={index}>
				<a style={optionStyle}>{name}</a>
			</Link>
		)}
	</div>

Submenu.propTypes = {
	options: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired
}

export default Submenu