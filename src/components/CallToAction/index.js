import React from 'react'
import { container, header, login, content, pill, call, btn } from './styles'

const CallToAction = () =>
	<div style={container}>
		<div style={header}>Tem cadastro? <span style={login}>login</span></div>
		<div style={content}>
			<span style={pill}>Faça parte</span>
			<div style={call}>
				Compre pra revender sem se preocupar com fornecedores, logística ou pagamento
			</div>
			<div style={btn}>Começar</div>
		</div>
	</div>

export default CallToAction