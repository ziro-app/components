import React, { useState, useEffect } from 'react'
import Button from '../Button/index'
import phones from './phones.png'
import { container, blockOne, blockTwo, callToAction, marker, explainer, btnContainer, btn, image } from './styles'

const HeroImage = () => {
	const [device, setDevice] = useState('phone')
	useEffect(() => {
		const smallMobile = window.matchMedia('(max-width: 399px)')
		const mobile = window.matchMedia('(min-width: 400px) and (max-width: 1199px)')
		const desktop = window.matchMedia('(min-width: 1200px)')
		// define user device
		if (smallMobile.matches) setDevice('smallMobile')
		if (mobile.matches) setDevice('mobile')
		if (desktop.matches) setDevice('desktop')
		// define listeners
		const listenerSmallMobile = ({ matches }) => {
			if (matches) setDevice('smallMobile')
		}
		const listenerMobile = ({ matches }) => {
			if (matches) setDevice('mobile')
		}
		const listenerDesktop = ({ matches }) => {
			if (matches) setDevice('desktop')
		}
		// add listeners
		smallMobile.addListener(listenerSmallMobile)
		mobile.addListener(listenerMobile)
		desktop.addListener(listenerDesktop)
		// cleanup
		return () => smallMobile.removeListener(listenerSmallMobile)
		return () => mobile.removeListener(listenerMobile)
		return () => desktop.removeListener(listenerDesktop)
	}, [])
	return (
		<div style={container(device)}>
			<div style={blockOne}>
				<p style={callToAction(device)}>Compre no Bom Retiro para <span style={marker}>revender</span></p>
				<p style={explainer(device)}>Compre qualquer produto de qualquer marca, sem se preocupar com cadastro, logística ou pagamento.</p>
				<div style={btnContainer(device)}><Button style={btn(device)} type='submit' cta='Acessar app' /></div>
			</div>
			<div style={blockTwo}>
				<img style={image} src={phones} />
			</div>
		</div>
	)
}

export default HeroImage