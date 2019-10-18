import React from 'react'
import PropTypes from 'prop-types'
import { Scaffold } from '../Scaffold'

export const Email = ({ style, onClick, size, color, strokeWidth }) =>
	<Scaffold
		svgPath={
			<>
				<path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'></path>
				<polyline points='22,6 12,13 2,6'></polyline>
			</>
		}
		style={style}
		onClick={onClick}
		size={size}
		color={color}
		strokeWidth={strokeWidth}
	/>

Email.propTypes = {
	style: PropTypes.object,
	onClick: PropTypes.func,
	size: PropTypes.number,
	color: PropTypes.string,
	strokeWidth: PropTypes.number
}