import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Scaffold } from '../Scaffold'

export const Lock = ({ style, onClick, size, color, strokeWidth }) =>
	<Scaffold
		svgPath={
			<Fragment>
				<rect x='3' y='11' width='18' height='11' rx='2' ry='2'></rect>
				<path d='M7 11V7a5 5 0 0 1 10 0v4'></path>
			</Fragment>
		}
		style={style}
		onClick={onClick}
		size={size}
		color={color}
		strokeWidth={strokeWidth}
	/>

Lock.propTypes = {
	style: PropTypes.object,
	onClick: PropTypes.func,
	size: PropTypes.number,
	color: PropTypes.string,
	strokeWidth: PropTypes.number
}