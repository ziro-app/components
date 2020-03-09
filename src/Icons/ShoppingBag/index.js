import React from 'react'
import PropTypes from 'prop-types'
import { primaryColor } from '@ziro/theme'

export const ShoppingBag = ({ size = 50, color = primaryColor, strokeWidth = 2 }) =>
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
		<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
		<line x1="3" y1="6" x2="21" y2="6"></line>
		<path d="M16 10a4 4 0 0 1-8 0"></path>
	</svg>

ShoppingBag.propTypes = {
	size: PropTypes.number,
	color: PropTypes.string,
	strokeWidth: PropTypes.number
}