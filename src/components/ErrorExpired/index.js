import React from 'react'
import Illustration from '../Illustration/index'
import { container, svg, title } from './styles'

const ErrorExpired = () =>
	<div style={container}>
		<div style={svg}><Illustration type='paymentError' /></div>
		<label style={title}>Cobrança expirada!</label>
		<label>Solicite um novo link ao seu assessor</label>
	</div>

export default ErrorExpired