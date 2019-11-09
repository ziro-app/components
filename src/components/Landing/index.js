import React from 'react'
import Logo from '../Logo/index'
import phones from './phones.png'
import { heroCall, heroText, heroImg } from './styles'

const Landing = () => {
	return (
		<>
			<Logo size={40} />
			<p style={heroCall}>Compre sem dificuldade roupas femininas para revender</p>
			<p style={heroText}>A Ziro facilita na escolha, no despacho e no pagamento da sua mercadoria</p>
			<img style={heroImg} src={phones} />
		</>
		
	)
}

export default Landing