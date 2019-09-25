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
import { Back } from '../../Icons/Back/index'
import { Cnpj } from '../../Icons/Cnpj/index'
import { Whats } from '../../Icons/Whats/index'
import { Lock } from '../../Icons/Lock/index'
import { Email } from '../../Icons/Email/index'
import { Calendar } from '../../Icons/Calendar/index'
import { Id } from '../../Icons/Id/index'
import { Amex } from '../../Icons/Amex/index'
import { Visa } from '../../Icons/Visa/index'
import { Mastercard } from '../../Icons/Mastercard/index'
import { Elo } from '../../Icons/Elo/index'
import { Hiper } from '../../Icons/Hiper/index'

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
		shopping: <Shopping {...iconProps} />,
		back: <Back {...iconProps} />,
		cnpj: <Cnpj {...iconProps} />,
		whats: <Whats {...iconProps} />,
		lock: <Lock {...iconProps} />,
		email: <Email {...iconProps} />,
		calendar: <Calendar {...iconProps} />,
		id: <Id {...iconProps} />,
		amex: <Amex {...iconProps} />,
		visa: <Visa {...iconProps} />,
		mastercard: <Mastercard {...iconProps} />,
		elo: <Elo {...iconProps} />,
		hiper: <Hiper {...iconProps} />,
		hipercard: <Hiper {...iconProps} />
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