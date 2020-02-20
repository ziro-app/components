import React from 'react'
import { useLocation } from 'wouter'
import Illustration from '../../Illustration/index'
import Button from '../../Button/index'
import { container, svg, title } from './styles'

export const SuccessModal = () => {
	const [, setLocation] = useLocation()
	return (
		<div style={container}>
			<div style={svg}><Illustration type='paymentSuccess' /></div>
			<label style={title}>Processando!</label>
			<label>Acompanhe o status pelo menu Pagamentos</label>
			<Button type='link' cta='Ver pagamentos' navigate={() => setLocation('/pagamentos')} />
		</div>
	)
}