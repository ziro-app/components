import React from 'react'
import PropTypes from 'prop-types'
import { primaryColor } from '@ziro/theme'

export const Scaffold = ({ svgPath, style, onClick, size, color, strokeWidth }) =>
	<svg
		style={style}
		onClick={onClick}
		width={size}
		height={size}
		stroke={color}
		strokeWidth={strokeWidth}
		viewBox='0 0 24 24'
		fill='none'
		strokeLinecap='round'
		strokeLinejoin='round'
	>
		{svgPath}
	</svg>

Scaffold.defaultProps = {
	style: null,
	onClick: null,
	size: 24,
	color: primaryColor,
	strokeWidth: 2
}

Scaffold.propTypes = {
	svgPath: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.element)
	]).isRequired,
	style: PropTypes.object,
	onClick: PropTypes.func,
	size: PropTypes.number,
	color: PropTypes.string,
	strokeWidth: PropTypes.number
}