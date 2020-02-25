import React, { useState, useEffect } from 'react'
import Button from '../Button/index'
import phones from './phones.png'
import { hero, heroCall, marker, heroText, button, heroImg,
	desktopContainer, blockOne, blockTwo, desktopCall, desktopMarker, desktopText, desktopImage, desktopButton, btn
} from './styles'
import { container } from '@ziro/theme'

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
	if (device === 'phone') {
		return (
			<div style={container}>
				<div style={hero}>
					<p style={heroCall}>Compre no Bom Retiro para revender<span style={marker}></span></p>
					<p style={heroText}>Compre qualquer produto de qualquer marca, sem se preocupar com cadastro, logística ou pagamento.</p>
					<div style={button}><Button type='submit' cta='Acessar app' /></div>
					<img style={heroImg} src={phones} />
				</div>
			</div>
		)
	}
	return (
		<div style={desktopContainer}>
				<div style={blockOne}>
					<p style={desktopCall}>Compre no Bom Retiro para <span style={desktopMarker}>revender</span></p>
					<p style={desktopText}>Compre qualquer produto de qualquer marca, sem se preocupar com cadastro, logística ou pagamento.</p>
					<div style={desktopButton}><Button style={btn} type='submit' cta='Acessar app' /></div>
				</div>
				<div style={blockTwo}>
					<img style={desktopImage} src={phones} />
				</div>
		</div>
	)
}

export default HeroImage