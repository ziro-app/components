import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'wouter'
import Logo from '../Logo/index'
import { container, link } from './styles'

const HeaderHome = ({ linkText, linkPath, linkClick = null, css = container, whiteText = false }) =>
	<div style={css}>
		<Logo />
		<Link style={link(whiteText)} to={linkPath} onClick={linkClick}>{linkText}</Link>
	</div>

HeaderHome.propTypes = {
	linkText: PropTypes.string.isRequired,
	linkPath: PropTypes.string.isRequired,
	linkClick: PropTypes.func,
	css: PropTypes.object,
	whiteText: PropTypes.bool
}

export default HeaderHome