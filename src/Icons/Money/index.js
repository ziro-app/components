import React from 'react'
import PropTypes from 'prop-types'
import { Scaffold } from '../Scaffold'

export const Money = ({ style, onClick, size, color, strokeWidth }) =>
	<Scaffold
		svgPath={
			<>
				<line x1='12' y1='1' x2='12' y2='23'></line>
				<path d='M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'></path>
			</>
		}
		style={style}
		onClick={onClick}
		size={size}
		color={color}
		strokeWidth={strokeWidth}
	/>

Money.propTypes = {
	style: PropTypes.object,
	onClick: PropTypes.func,
	size: PropTypes.number,
	color: PropTypes.string,
	strokeWidth: PropTypes.number
}