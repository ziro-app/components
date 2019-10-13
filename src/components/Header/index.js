import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'wouter'
import Icon from '../Icon/index'
import { container, svg, text } from './styles'

const Header = ({ type, title, icon, setIsOpen, navigateTo }) => {
	const component = {
		'icon': 
			<>
				<Icon type={icon} style={svg} onClick={setIsOpen} />
				<h1 style={text}>{title}</h1>
			</>,
		'icon-link':
			<>
				<Link to={navigateTo}><Icon type={icon} style={svg} /></Link>
				<h1 style={text}>{title}</h1>
			</>,
		'title-only': <h1 style={text}>{title}</h1>
	}
	return (
		<div style={container}>
			{component[type]}
		</div>
	)
}

Header.propTypes = {
	type: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	icon: PropTypes.string,
	setIsOpen: PropTypes.func,
	navigateTo: PropTypes.string
}

export default Header