import React from 'react'
// Pill
// ButtonGhost
import { container, content, pill, call, btn } from './styles'

const CallToAction = () =>
	<div style={container}>
		<div style={content}>
			<span style={pill}>Faça parte</span>
			<div style={call}>Compre pra revender sem se preocupar com fornecedores, logística ou pagamento</div>
			<div style={btn}>Começar</div>
		</div>
	</div>

export default CallToAction