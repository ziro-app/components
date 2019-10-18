import React from 'react'
import Illustration from '../Illustration/index'
import { container, svg, title } from './styles'

const ErrorLoading = () =>
	<div style={container}>
		<div style={svg}><Illustration type='paymentError' /></div>
		<label style={title}>Ocorreu um erro!</label>
		<label>Recarregue a página ou contate seu assessor</label>
	</div>

export default ErrorLoading