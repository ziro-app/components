import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'wouter'
import Icon from '../Icon/index'
// import { animation } from './animation'
import { container, user, navlink, icon, text } from './styles'

const DrawerPanel = () => {
	return (
		<div style={container}>
			<div style={user}>
				<Icon type='close' />
				<label>Olá, Vitor Barbosa</label>
				<label>CNPJ: 28.026.371/0001-61</label>
			</div>
			<div>
				<Link style={navlink}>
					<div style={icon}><Icon type='pen' size={12} /></div>
					<label style={text}>Atendimentos</label>
				</Link>
			</div>
		</div>
	)
}

export default DrawerPanel