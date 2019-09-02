import React from 'react'
import PropTypes from 'prop-types'
import { Success } from '../../Icons/Success/index'

const Icon = ({ type, size, color }) => {
	const iconList = {
		success: <Success size={size} color={color} />
	}
	return iconList[type]
}

Icon.propTypes = {
	type: PropTypes.string.isRequired,
	size: PropTypes.number.isRequired,
	color: PropTypes.string.isRequired
}

export default Icon