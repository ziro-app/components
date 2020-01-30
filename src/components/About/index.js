import React from 'react'
import Logo from '../Logo/index'
import MapBox from '../MapBox/index'
import SocialMedia from '../SocialMedia/index'
import { container, name } from './styles'

const About = () =>
	<div style={container}>
		<Logo />
		<label style={name}>Ziro Negócios Digitais Ltda</label>
		<label>28.026.371/0001-61</label>
		<label>R. Lubavitch, 71, Bom Retiro</label>
		<label>01123-110, São Paulo - SP</label>
		<MapBox />
		<SocialMedia />
	</div>

export default About