import React from 'react'
import PropTypes from 'prop-types'
import { container, menuOptions, name } from './styles'

const MenuHover = ({ options, addContainerStyle }) =>
	<div style={{...container, ...addContainerStyle}}>
		<div style={menuOptions}>
			{options.map((option, index) => <label key={index} style={name}>{option}</label>)}
		</div>
	</div>

MenuHover.propTypes = {
	options: PropTypes.array.isRequired,
	addContainerStyle: PropTypes.object
}

export default MenuHover