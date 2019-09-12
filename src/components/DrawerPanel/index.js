import React, { useState, useCallback } from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'wouter'
import Icon from '../Icon/index'
// import { animation } from './animation'
import { container, header, user, name, word, color, cnpj, nav, navlink, icon, text } from './styles'

const DrawerPanel = () => {
	const [highlightBoxWidth, setHighlightBoxWidth] = useState(0)
	const highlightBox = useCallback(htmlNode => {
		if (htmlNode) setHighlightBoxWidth(htmlNode.getBoundingClientRect().width)
	})
	return (
		<div style={container}>
			<div style={header}>
				<Icon type='close' />
				<div style={user}>
					<label style={name}>
						Olá,&nbsp;
						<span style={word} ref={highlightBox}>
							<span style={color(highlightBoxWidth)}></span>
							Vitor Barbosa
						</span>
					</label>
					<label style={cnpj}>CNPJ: 28.026.371/0001-61</label>
				</div>
			</div>
			<div style={nav}>
				<Link style={navlink}>
					<div style={icon}><Icon type='truck' size={13} strokeWidth={3} /></div>
					<label style={text}>Atendimentos</label>
				</Link>
				<Link style={navlink}>
					<div style={icon}><Icon type='card' size={13} strokeWidth={3} /></div>
					<label style={text}>Pagamentos</label>
				</Link>
				<Link style={navlink}>
					<div style={icon}><Icon type='user' size={13} strokeWidth={3} /></div>
					<label style={text}>Meus Dados</label>
				</Link>
				<Link style={navlink}>
					<div style={icon}><Icon type='logout' size={13} strokeWidth={3} /></div>
					<label style={text}>Sair</label>
				</Link>
			</div>
		</div>
	)
}

export default DrawerPanel