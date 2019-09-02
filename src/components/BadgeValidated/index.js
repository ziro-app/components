import React from 'react'
import PropTypes from 'prop-types'
import { SuccessIcon } from '../../Icons/SuccessIcon/index'
import { successColor } from '../../Theme/variables'
import { container } from './styles'

const BadgeValidated = fontSize =>
	<label style={container(fontSize, successColor)}>
		<SuccessIcon size={fontSize} color={successColor} />
		validado
	</label>

BadgeValidated.propTypes = {
	fontSize: PropTypes.number.isRequired
}

export default BadgeValidated