import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Scaffold } from '../Scaffold'

export const User = ({ style, onClick, size, color, strokeWidth }) =>
	<Scaffold
		svgPath={
			<Fragment>
				<path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
				<circle cx='12' cy='7' r='4'></circle>
			</Fragment>
		}
		style={style}
		onClick={onClick}
		size={size}
		color={color}
		strokeWidth={strokeWidth}
	/>

User.propTypes = {
	style: PropTypes.object,
	onClick: PropTypes.func,
	size: PropTypes.number,
	color: PropTypes.string,
	strokeWidth: PropTypes.number
}