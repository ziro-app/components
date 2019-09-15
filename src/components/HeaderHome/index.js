import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'wouter'
import Icon from '../Icon/index'
import { container, svg, link } from './styles'

const HeaderHome = ({ linkPath, linkText }) =>
	<div style={container}>
		<Icon type='menu' style={svg} />
		<Link style={link} to={linkPath}>{linkText}</Link>
	</div>

HeaderHome.propTypes = {
	linkPath: PropTypes.string.isRequired,
	linkText: PropTypes.string.isRequired
}

export default HeaderHome