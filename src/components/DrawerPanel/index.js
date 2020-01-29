import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'wouter'
import { header, welcome, word, color, name, cnpj, nav, navlink, navicon, navtext, navsoon } from './styles'

const DrawerPanel = ({ username, userdata, options }) => {
	const [highlightBoxWidth, setHighlightBoxWidth] = useState(0)
	const highlightBox = useCallback(htmlNode => {
		if (htmlNode) setHighlightBoxWidth(htmlNode.getBoundingClientRect().width)
	}, [username])
	return (
		<>
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
				<label style={cnpj}>{userdata}</label>
			</div>
			<div style={nav}>
				{options.map(({ path, onClick, icon, text, soon }, index) =>
					<Link style={navlink} to={path} onClick={onClick} key={index}>
						<div style={navicon}>{icon}</div>
						<label style={navtext}>
							{text}
							{soon && <label style={navsoon}>&nbsp;(breve)</label>}
						</label>
					</Link>
				)}
			</div>
		</>
	)
}

DrawerPanel.propTypes = {
	/** Propriedade referente ao username do usuário */
	username: PropTypes.string.isRequired,
	/** Propriedade referente ao documento de identificação do usuário */
	userdata: PropTypes.string.isRequired,
	/** Array de objetos referente aos itens disponíveis no menu para que o usuário acesse */
	options: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default DrawerPanel