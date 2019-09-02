import React from 'react'
import PropTypes from 'prop-types'
import { Success } from '../../Icons/Success/index'

const Icon = ({ type, size, color, strokeWidth }) => {
	const iconProps = { size, color, strokeWidth }
	const iconList = {
		success: <Success {...iconProps} />
	}
	return iconList[type]
}

Icon.propTypes = {
	type: PropTypes.string.isRequired,
	size: PropTypes.number.isRequired,
	color: PropTypes.string.isRequired,
	strokeWidth: PropTypes.number.isRequired
}

export default Icon