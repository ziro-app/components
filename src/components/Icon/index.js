import React from 'react'
import PropTypes from 'prop-types'
import { Success } from '../../Icons/Success/index'
import { Alert } from '../../Icons/Alert/index'
import { Warning } from '../../Icons/Warning/index'
import { Pen } from '../../Icons/Pen/index'
import { Close } from '../../Icons/Close/index'
import { Menu } from '../../Icons/Menu/index'
import { Truck } from '../../Icons/Truck/index'
import { Card } from '../../Icons/Card/index'
import { User } from '../../Icons/User/index'
import { Logout } from '../../Icons/Logout/index'
import { Shopping } from '../../Icons/Shopping/index'

const Icon = ({ type, style, onClick, size, color, strokeWidth }) => {
	const iconProps = { style, onClick, size, color, strokeWidth }
	const iconList = {
		success: <Success {...iconProps} />,
		alert: <Alert {...iconProps} />,
		warning: <Warning {...iconProps} />,
		pen: <Pen {...iconProps} />,
		close: <Close {...iconProps} />,
		menu: <Menu {...iconProps} />,
		truck: <Truck {...iconProps} />,
		card: <Card {...iconProps} />,
		user: <User {...iconProps} />,
		logout: <Logout {...iconProps} />,
		shopping: <Shopping {...iconProps} />
	}
	return iconList[type]
}

Icon.propTypes = {
	type: PropTypes.string.isRequired,
	style: PropTypes.object,
	onClick: PropTypes.func,
	size: PropTypes.number,
	color: PropTypes.string,
	strokeWidth: PropTypes.number
}

export default Icon