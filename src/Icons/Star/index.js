import React from 'react'
import PropTypes from 'prop-types'
import { primaryColor } from '@ziro/theme'

export const Star = ({ size = 50, color = primaryColor, strokeWidth = 2, fill = false }) =>
	<svg width={size} height={size} viewBox="0 0 24 24" fill={fill ? primaryColor : "none"} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
		<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
	</svg>

Star.propTypes = {
	size: PropTypes.number,
	color: PropTypes.string,
	strokeWidth: PropTypes.number
}