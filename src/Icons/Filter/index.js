import React from 'react'
import PropTypes from 'prop-types'
import { Scaffold } from '../Scaffold'

export const Filter = ({ style, onClick, size, color, strokeWidth, fill }) =>
	<Scaffold
		svgPath={
			<>
				<polygon points='22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3'></polygon>
			</>
		}
		style={style}
		onClick={onClick}
		size={size}
		color={color}
		strokeWidth={strokeWidth}
		fill={fill}
	/>

Filter.propTypes = {
	style: PropTypes.object,
	onClick: PropTypes.func,
	size: PropTypes.number,
	color: PropTypes.string,
	strokeWidth: PropTypes.number
}