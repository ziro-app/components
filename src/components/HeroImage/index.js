import React, { useState, useEffect } from 'react'
import Button from '../Button/index'
import phones from './phones.png'
import { container, blockOne, blockTwo, callToAction, marker, explainer, btnContainer, btn, image } from './styles'

const HeroImage = () => {
	const [device, setDevice] = useState('phone')
	useEffect(() => {
		const media = window.matchMedia('(max-width: 1200px)')
		if (!media.matches) setDevice('desktop')
		const listener = ({ matches }) => {
			if (matches) setDevice('phone')
			else setDevice('desktop')
		}
		media.addListener(listener)
		return () => media.removeListener(listener)
	}, [])
	return (
		<div style={container(device)}>
			<div style={blockOne}>
				<p style={callToAction(device)}>Compre no Bom Retiro para <span style={marker}>revender</span></p>
				<p style={explainer(device)}>Compre qualquer produto de qualquer marca, sem se preocupar com cadastro, logística ou pagamento.</p>
				<div style={btnContainer(device)}><Button style={btn(device)} type='submit' cta='Acessar app' /></div>
			</div>
			<div style={blockTwo}>
				<img style={image(device)} src={phones} />
			</div>
		</div>
	)
}

export default HeroImage