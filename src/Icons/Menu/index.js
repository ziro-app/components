import React from 'react'
import PropTypes from 'prop-types'
import { primaryColor } from '../../Theme/variables'

export const Menu = ({ size = 24, color = primaryColor, strokeWidth = 2, onClick = null }) =>
	<svg onClick={onClick} width={size} height={size} viewBox='0 0 24 24' fill='none' stroke={color} strokeWidth={strokeWidth} strokeLinecap='round' strokeLinejoin='round'>
		<line x1='3' y1='12' x2='21' y2='12'></line>
		<line x1='3' y1='6' x2='21' y2='6'></line>
		<line x1='3' y1='18' x2='21' y2='18'></line>
	</svg>

Menu.propTypes = {
	size: PropTypes.number,
	color: PropTypes.string,
	strokeWidth: PropTypes.number,
	onClick: PropTypes.func
}