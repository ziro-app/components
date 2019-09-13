import React, { useState, useCallback, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'wouter'
import { header, welcome, word, color, name, cnpj, nav, navlink, icon, text } from './styles'

const DrawerPanel = ({ username, usercnpj, options }) => {
	const [highlightBoxWidth, setHighlightBoxWidth] = useState(0)
	const highlightBox = useCallback(htmlNode => {
		if (htmlNode) setHighlightBoxWidth(htmlNode.getBoundingClientRect().width)
	}, [])
	return (
		<Fragment>
			<div style={header}>
				<label style={welcome}>
					Olá,&nbsp;
					<span style={word}>
						<span style={color(highlightBoxWidth)}></span>
						<span style={name} ref={highlightBox}>
							{username}
						</span>
					</span>
				</label>
				<label style={cnpj}>CNPJ: {usercnpj}</label>
			</div>
			<div style={nav}>
				{options.map((option, index) =>
					<Link style={navlink} to={option.path} key={index}>
						<div style={icon}>{option.icon}</div>
						<label style={text}>{option.text}</label>
					</Link>
				)}
			</div>
		</Fragment>
	)
}

DrawerPanel.propTypes = {
	username: PropTypes.string.isRequired,
	usercnpj: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default DrawerPanel