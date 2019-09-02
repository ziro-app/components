import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon/index'
import { successColor } from '../../Theme/variables'
import { container } from './styles'

const BadgeValidated = fontSize =>
	<label style={container(fontSize, successColor)}>
		<Icon type='success' size={fontSize} color={successColor} strokeWidth={3} />
		validado
	</label>

BadgeValidated.propTypes = {
	fontSize: PropTypes.number.isRequired
}

export default BadgeValidated