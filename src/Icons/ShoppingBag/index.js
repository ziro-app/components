import React from 'react'
import PropTypes from 'prop-types'
import { primaryColor } from '@ziro/theme'

export const ShoppingBag = ({ size = 50, color = primaryColor, strokeWidth = 2, fill = false }) =>
	<svg width={size} height={size} viewBox="0 0 20 23" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
		<path d="M3.67338214,5 L0,5 L0,19 C0,20.1045695 0.8954305,21 2,21 L16,21 C17.1045695,21 18,20.1045695 18,19 L18,5 L13.8164062,5 L3.67338214,5 Z" fill={fill ? primaryColor : "none"}></path>
        <polyline points="0 5 3.01311311 0.981883612 14.8875492 0.981883612 18 5"></polyline>
        <path d="M13,9 C13,11.209139 11.209139,13 9,13 C6.790861,13 5,11.209139 5,9" stroke={fill?'white':color}></path>
	</svg>

ShoppingBag.propTypes = {
	size: PropTypes.number,
	color: PropTypes.string,
	strokeWidth: PropTypes.number
}