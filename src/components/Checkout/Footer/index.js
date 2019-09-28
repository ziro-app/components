import React from 'react'
import { container, summary, title, service, total, amount, regulatory, info } from './styles'

export const Footer = () => {
	return (
		<div style={container}>
			<div style={summary}>
				<div style={title}>Resumo do pagamento</div>
				<div style={service}>
					<label>Crisfael</label>
					<label style={total}>R$181.234,66</label>
				</div>
				<label style={amount}>4x de R$45.308,66</label>
			</div>
			<div style={regulatory}>
				<label style={info}>pagamento via Ziro: 28.026.371/0001-61</label>
			</div>
		</div>
	)
}