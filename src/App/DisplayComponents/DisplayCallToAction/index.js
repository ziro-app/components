import React from 'react'
import CallToAction from '../../../components/CallToAction/index'
import { container } from '@ziro/theme'

export const DisplayCallToAction = () =>
	<div style={container}>
		<CallToAction
			headerText='Tem cadastro? LOGIN'
			headerLinkPath='#'
			pillText='Faça parte'
			ctaText='Compre pra revender sem se preocupar com fornecedores, logística ou pagamento'
			btnPath='#'
			btnClick={() => console.log('clicked')}
			btnText='Começar'
		/>
	</div>