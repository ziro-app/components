import React from 'react'
import PropTypes from 'prop-types'
import { container, menuOptions, name } from './styles'

const MenuHover = ({ options }) =>
	<div style={container}>
		<div style={menuOptions}>
			{options.map((option, index) => <label key={index} style={name}>{option}</label>)}
		</div>
	</div>

MenuHover.propTypes = {
	options: PropTypes.array.isRequired
}

export default MenuHover