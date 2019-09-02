import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon/index'
import { container } from './styles'

const Badge = ({ type, size, color, strokeWidth, message }) =>
	<label style={container(size, color)}>
		<Icon type={type} size={size} color={color} strokeWidth={strokeWidth} />
		{message}
	</label>

Badge.propTypes = {
	type: PropTypes.string.isRequired,
	size: PropTypes.number.isRequired,
	color: PropTypes.string.isRequired,
	strokeWidth: PropTypes.number.isRequired,
	message: PropTypes.string.isRequired
}

export default Badge