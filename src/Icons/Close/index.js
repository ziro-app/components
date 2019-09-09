import React from 'react'
import PropTypes from 'prop-types'
import { primaryColor } from '../../Theme/variables'

export const Close = ({ size = 24, color = primaryColor, strokeWidth = 2, onClick = null }) =>
	<svg onClick={onClick} width={size} height={size} viewBox='0 0 24 24' fill='none' stroke={color} strokeWidth={strokeWidth} strokeLinecap='round' strokeLinejoin='round'>
		<line x1='18' y1='6' x2='6' y2='18'></line>
		<line x1='6' y1='6' x2='18' y2='18'></line>
	</svg>

Close.propTypes = {
	size: PropTypes.number,
	color: PropTypes.string,
	strokeWidth: PropTypes.number,
	onClick: PropTypes.func
}