import React from 'react'
import PropTypes from 'prop-types'
import { primaryColor } from '../../Theme/variables'

export const Success = ({ size = 24, color = primaryColor, strokeWidth = 2 }) =>
	<svg width={size} height={size} viewBox='0 0 24 24' fill='none' stroke={color} strokeWidth={strokeWidth} strokeLinecap='round' strokeLinejoin='round'>
		<path d='M22 11.08V12a10 10 0 1 1-5.93-9.14'></path>
		<polyline points='22 4 12 14.01 9 11.01'></polyline>
	</svg>

Success.propTypes = {
	size: PropTypes.number,
	color: PropTypes.string,
	strokeWidth: PropTypes.number
}