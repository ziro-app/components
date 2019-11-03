import React from 'react'
import Map from '../Map/index'
import Logo from '../Logo/index'
import { container, name } from './styles'

const About = () =>
	<div style={container}>
		<Logo />
		<label style={name}>Ziro Negócios Digitais Ltda</label>
		<label>28.026.371/0001-61</label>
		<label>Blog | Catálogo</label>
		<label>R. Lubavitch, 71, Bom Retiro - SP</label>
		<Map center={[-46.638279672833505,-23.529533748594474]} zoom={15} />
	</div>

export default About