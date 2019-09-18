import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Scaffold } from '../Scaffold'

export const Cnpj = ({ style, onClick, size, color, strokeWidth }) =>
	<Scaffold
		svgPath={
			<Fragment>
				<path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'></path>
				<polyline points='9 22 9 12 15 12 15 22'></polyline>
			</Fragment>
		}
		style={style}
		onClick={onClick}
		size={size}
		color={color}
		strokeWidth={strokeWidth}
	/>

Cnpj.propTypes = {
	style: PropTypes.object,
	onClick: PropTypes.func,
	size: PropTypes.number,
	color: PropTypes.string,
	strokeWidth: PropTypes.number
}