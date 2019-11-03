import React from 'react'
import PropTypes from 'prop-types'
import Logo from '../Logo/index'
import { container, name } from './styles'

const About = () =>
	<div style={container}>
		<Logo />
		<label style={name}>Ziro Negócios Digitais Ltda</label>
		<label>28.026.371/0001-61</label>
		<label>Blog | Catálogo</label>
		<label>R. Lubavitch, 71, Bom Retiro - SP</label>
	</div>

About.propTypes = {
}

export default About