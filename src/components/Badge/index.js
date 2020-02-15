import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon/index'
import { container } from './styles'
import { primaryColor } from '@ziro/theme'

const Badge = ({ type, message, size = 10, color = primaryColor, strokeWidth = 3, style = container(size, color) }) =>
	<label style={style}>
		<Icon type={type} size={size} color={color} strokeWidth={strokeWidth} />
		{message}
	</label>

Badge.propTypes = {
	type: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
	size: PropTypes.number,
	color: PropTypes.string,
	strokeWidth: PropTypes.number,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
}

export default Badge