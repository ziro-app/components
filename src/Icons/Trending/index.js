import React from 'react'
import PropTypes from 'prop-types'
import { Scaffold } from '../Scaffold'

export const Trending = ({ style, onClick, size, color, strokeWidth }) =>
	<Scaffold
		svgPath={
			<>
				<polyline points='23 6 13.5 15.5 8.5 10.5 1 18'></polyline>
				<polyline points='17 6 23 6 23 12'></polyline>
			</>
		}
		style={style}
		onClick={onClick}
		size={size}
		color={color}
		strokeWidth={strokeWidth}
	/>

Trending.propTypes = {
	style: PropTypes.object,
	onClick: PropTypes.func,
	size: PropTypes.number,
	color: PropTypes.string,
	strokeWidth: PropTypes.number
}