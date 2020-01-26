import React from 'react'
import Logo from '../Logo/index'
import Icon from '../Icon/index'
import { containerWithPadding, alertColor } from '@ziro/theme'
import { container, title, alert } from './styles'

const ErrorMessage = () =>
	<div style={{...containerWithPadding, ...container}}>
		<Logo />
		<h1 style={title}>Erro na página</h1>
		<div style={alert}><Icon type='alert' color={alertColor} /></div>
		<p>Ocorreu um erro na renderização</p>
		<p>Recarregue a página ou contate o suporte</p>
	</div>

export default ErrorMessage