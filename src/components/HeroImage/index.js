import React, { useEffect } from 'react'
import Button from '../Button/index'
import phones from './phones.png'
import { hero, heroCall, marker, heroText, heroImg, button } from './styles'

const HeroImage = () => {
	useEffect(() => {
		window.matchMedia('(max-width: 680px)').addListener(({ matches }) => console.log(matches))
	}, [])
	return (
		<div style={hero}>
			<p style={heroCall}>Compre sem dificuldade roupas femininas para revender<span style={marker}></span></p>
			<p style={heroText}>A Ziro facilita na escolha de fornecedores, no despacho e no pagamento da sua mercadoria</p>
			<div style={button}><Button type='submit' cta='Fale conosco' /></div>
			<img style={heroImg} src={phones} />
		</div>
	)
}

export default HeroImage