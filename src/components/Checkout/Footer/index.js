import React from 'react'
import { container, info, amount, legal, ziro, cnpj, pay } from './styles'

export const Footer = () => {
	return (
		<div style={container}>
			<div style={info}>
				<label style={amount}>À Pagar: R$181.190,88</label>
				<div style={legal}>
					<label style={ziro}>Ziro</label>
					<label style={cnpj}>28.026.371/0001-61</label>
				</div>
			</div>
			<div style={pay}>Button</div>
		</div>
	)
}