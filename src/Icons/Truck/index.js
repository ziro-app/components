import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Scaffold } from '../Scaffold'

export const Truck = ({ style, onClick, size, color, strokeWidth }) =>
	<Scaffold
		svgPath={
			<Fragment>
				<rect x='1' y='3' width='15' height='13'></rect>
				<polygon points='16 8 20 8 23 11 23 16 16 16 16 8'></polygon>
				<circle cx='5.5' cy='18.5' r='2.5'></circle>
				<circle cx='18.5' cy='18.5' r='2.5'></circle>
			</Fragment>
		}
		style={style}
		onClick={onClick}
		size={size}
		color={color}
		strokeWidth={strokeWidth}
	/>

Truck.propTypes = {
	style: PropTypes.object,
	onClick: PropTypes.func,
	size: PropTypes.number,
	color: PropTypes.string,
	strokeWidth: PropTypes.number
}