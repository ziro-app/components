import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'wouter'
import Logo from '../Logo/index'
import { container, link } from './styles'

const HeaderHome = ({ linkPath, linkText }) =>
	<div style={container}>
		<Logo />
		<Link style={link} to={linkPath}>{linkText}</Link>
	</div>

HeaderHome.propTypes = {
	linkPath: PropTypes.string.isRequired,
	linkText: PropTypes.string.isRequired
}

export default HeaderHome