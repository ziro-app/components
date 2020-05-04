import React from 'react'
import PropTypes from 'prop-types'
import { container, menuOptions, name } from './styles'

const MenuHover = ({ options, addContainerStyle, maxWidth, height }) =>
	<div style={{...container(maxWidth, height), ...addContainerStyle}}>
		<div style={menuOptions(options.length)}>
			{options.map(({ label, onClick }, index) =>
				<label key={index} style={name} onClick={onClick}>{label}</label>
			)}
		</div>
	</div>

MenuHover.propTypes = {
	options: PropTypes.array.isRequired,
	addContainerStyle: PropTypes.object,
	maxWidth: PropTypes.string,
	height: PropTypes.string
}

export default MenuHover