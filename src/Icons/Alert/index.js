import React from 'react'
import PropTypes from 'prop-types'
import { primaryColor } from '../../Theme/variables'

export const Alert = ({ size = 24, color = primaryColor, strokeWidth = 2 }) =>
	<svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke={color} strokeWidth={strokeWidth} strokeLinecap='round' strokeLinejoin='round'>
		<circle cx='12' cy='12' r='10'></circle>
		<line x1='12' y1='8' x2='12' y2='12'></line>
		<line x1='12' y1='16' x2='12' y2='16'></line>
	</svg>

Alert.propTypes = {
	size: PropTypes.number,
	color: PropTypes.string,
	strokeWidth: PropTypes.number
}