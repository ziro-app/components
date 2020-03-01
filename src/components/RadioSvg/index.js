import React from 'react'
import PropTypes from 'prop-types'
import { primaryColor } from '@ziro/theme'

const RadioSvg = ({ size = 18, color = primaryColor, isActive }) =>
	<svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
		<circle cx={size / 2} cy={size / 2} r={size / 2 - 2} fill='none' stroke={color} strokeWidth={isActive ? '3' : '1'} />
		{isActive ? <circle cx={size / 2} cy={size / 2} r={size / 2 - 6} fill={color} /> : null}
	</svg>

RadioSvg.propTypes = {
	size: PropTypes.number,
	color: PropTypes.string,
	isActive: PropTypes.bool.isRequired
}

export default RadioSvg