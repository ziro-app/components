import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon/index'
import { container, text } from './styles'

const HeaderWithMenu = ({ title, setIsOpen }) =>
	<div style={container}>
		<Icon />
		<h1 style={text}>{title}</h1>
	</div>

HeaderWithMenu.propTypes = {
	title: PropTypes.string.isRequired,
	setIsOpen: PropTypes.func.isRequired
}

export default HeaderWithMenu