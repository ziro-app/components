import React from 'react'
import PropTypes from 'prop-types'
import { Scaffold } from '../Scaffold'

export const Success = ({ style, onClick, size, color, strokeWidth }) =>
	<Scaffold
		svgPath={
			<>
				<path d='M22 11.08V12a10 10 0 1 1-5.93-9.14'></path>
				<polyline points='22 4 12 14.01 9 11.01'></polyline>
			</>
		}
		style={style}
		onClick={onClick}
		size={size}
		color={color}
		strokeWidth={strokeWidth}
	/>

Success.propTypes = {
	style: PropTypes.object,
	onClick: PropTypes.func,
	size: PropTypes.number,
	color: PropTypes.string,
	strokeWidth: PropTypes.number
}