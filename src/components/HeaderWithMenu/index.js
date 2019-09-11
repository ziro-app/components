import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon/index'
import { container, svg, text } from './styles'

const HeaderWithMenu = ({ title, setIsOpen }) =>
	<div style={container}>
		<Icon type='menu' style={svg} onClick={() => setIsOpen(true)} />
		<h1 style={text}>{title}</h1>
	</div>

HeaderWithMenu.propTypes = {
	title: PropTypes.string.isRequired,
	setIsOpen: PropTypes.func.isRequired
}

export default HeaderWithMenu