import React from 'react'
import PropTypes from 'prop-types'
import { Scaffold } from '../Scaffold'

export const Pen = ({ style, onClick, size, color, strokeWidth }) =>
	<Scaffold
		svgPath={
			<>
				<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
			</>
		}
		style={style}
		onClick={onClick}
		size={size}
		color={color}
		strokeWidth={strokeWidth}
	/>

Pen.propTypes = {
	style: PropTypes.object,
	onClick: PropTypes.func,
	size: PropTypes.number,
	color: PropTypes.string,
	strokeWidth: PropTypes.number
}