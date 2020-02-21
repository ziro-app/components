import React from 'react'
import PropTypes from 'prop-types'
import { primaryColor } from '@ziro/theme'

export const Add = ({ size = 50, color = primaryColor }) =>
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<line x1="12" y1="5" x2="12" y2="19"/>
		<line x1="5" y1="12" x2="19" y2="12"/>
	</svg>

Add.propTypes = {
	size: PropTypes.number,
	color: PropTypes.string
}