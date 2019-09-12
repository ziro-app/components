import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'wouter'
import Icon from '../Icon/index'
// import { animation } from './animation'
import { container, user, nav, navlink, icon, text } from './styles'

const DrawerPanel = () => {
	return (
		<div style={container}>
			<div style={user}>
				<Icon type='close' />
				<label>Olá, Vitor Barbosa</label>
				<label>CNPJ: 28.026.371/0001-61</label>
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