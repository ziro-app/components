import React from 'react'
import PropTypes from 'prop-types'
import { Success } from '../../Icons/Success/index'
import { Alert } from '../../Icons/Alert/index'
import { Pen } from '../../Icons/Pen/index'

const Icon = ({ type, size, color, strokeWidth }) => {
	const iconProps = { size, color, strokeWidth }
	const iconList = {
		success: <Success {...iconProps} />,
		alert: <Alert {...iconProps} />,
		pen: <Pen {...iconProps} />
	}
	return iconList[type]
}

Icon.propTypes = {
	type: PropTypes.string.isRequired,
	size: PropTypes.number,
	color: PropTypes.string,
	strokeWidth: PropTypes.number
}

export default Icon