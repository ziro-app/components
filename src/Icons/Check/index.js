import React from 'react'
import PropTypes from 'prop-types'
import { primaryColor } from '@ziro/theme'

export const Check = ({ size = 50, color = primaryColor }) =>
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<polyline points="20 6 9 17 4 12"/>
	</svg>

Check.propTypes = {
	size: PropTypes.number,
	color: PropTypes.string
}