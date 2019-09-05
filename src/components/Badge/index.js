import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon/index'
import { container } from './styles'
import { primaryColor } from '../../Theme/variables'

const Badge = ({ type, size = 10, color = primaryColor, strokeWidth = 3, message, style = container(size, color) }) =>
	<label style={style}>
		<Icon type={type} size={size} color={color} strokeWidth={strokeWidth} />
		{message}
	</label>

Badge.propTypes = {
	type: PropTypes.string.isRequired,
	size: PropTypes.number,
	color: PropTypes.string,
	strokeWidth: PropTypes.number,
	message: PropTypes.string.isRequired
}

export default Badge