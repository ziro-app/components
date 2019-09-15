import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'wouter'
import Logo from '../Logo/index'
import { container, link } from './styles'

const HeaderHome = ({ linkPath, linkText, css = container, whiteText = false }) =>
	<div style={css}>
		<Logo />
		<Link style={link(whiteText)} to={linkPath}>{linkText}</Link>
	</div>

HeaderHome.propTypes = {
	linkPath: PropTypes.string.isRequired,
	linkText: PropTypes.string.isRequired,
	css: PropTypes.object,
	whiteText: PropTypes.bool
}

export default HeaderHome