import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Scaffold } from '../Scaffold'

export const Card = ({ style, onClick, size, color, strokeWidth }) =>
	<Scaffold
		svgPath={
			<Fragment>
				<rect x='1' y='4' width='22' height='16' rx='2' ry='2'></rect>
				<line x1='1' y1='10' x2='23' y2='10'></line>
			</Fragment>
		}
		style={style}
		onClick={onClick}
		size={size}
		color={color}
		strokeWidth={strokeWidth}
	/>

Card.propTypes = {
	style: PropTypes.object,
	onClick: PropTypes.func,
	size: PropTypes.number,
	color: PropTypes.string,
	strokeWidth: PropTypes.number
}