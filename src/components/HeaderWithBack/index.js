import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'wouter'
import Icon from '../Icon/index'
import { container, svg, text } from './styles'

const HeaderWithBack = ({ title, backUrl }) =>
	<div style={container}>
		<Link to={backUrl}><Icon type='back' style={svg} /></Link>
		<h1 style={text}>{title}</h1>
	</div>

HeaderWithBack.propTypes = {
	title: PropTypes.string.isRequired,
	backUrl: PropTypes.string.isRequired
}

export default HeaderWithBack