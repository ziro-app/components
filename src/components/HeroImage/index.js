import React, { useState, useEffect } from 'react'
import Button from '../Button/index'
import phones from './phones.png'
import { hero, heroCall, marker, heroText, heroImg, button } from './styles'

const HeroImage = () => {
	const [device, setDevice] = useState('phone')
	useEffect(() => {
		const media = window.matchMedia('(max-width: 680px)')
		if (!media.matches) setDevice('desktop')
		const listener = ({ matches }) => {
			if (matches) setDevice('phone')
			else setDevice('desktop')
		}
		media.addListener(listener)
		return () => media.removeListener(listener)
	}, [])
	return (
		<div style={hero}>
			<p style={heroCall}>Compre no Bom Retiro para revender<span style={marker}></span></p>
			<p style={heroText}>Compre qualquer produto de qualquer marca, sem se preocupar com cadastro, logística ou pagamento.</p>
			<div style={button}><Button type='submit' cta='Acessar app' /></div>
			<img style={heroImg} src={phones} />
		</div>
	)
}

export default HeroImage