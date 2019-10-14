import React from 'react'
import Illustration from '../../Illustration/index'
import Button from '../../Button/index'
import { container, svg, title } from './styles'

export const ErrorModal = (props) => {
	console.log(props)
	return (
	<div style={container}>
		<div style={svg}><Illustration type='paymentError' /></div>
		<label style={title}>Erro no envio!</label>
		<label>Tente novamente ou contate seu assessor</label>
		<Button type='link' cta='Tentar novamente' navigate={props.setCloseModal} />
	</div>
	)
}