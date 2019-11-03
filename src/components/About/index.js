import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import Logo from '../Logo/index'
import { container, name } from './styles'

const About = () => {
	useEffect(() => {
		mapboxgl.accessToken = '';
		var map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [-46.638279672833505,-23.529533748594474],
			zoom: 15
		});
	}, [])
	return (
	<div style={container}>
		<Logo />
		<label style={name}>Ziro Negócios Digitais Ltda</label>
		<label>28.026.371/0001-61</label>
		<label>Blog | Catálogo</label>
		<label>R. Lubavitch, 71, Bom Retiro - SP</label>
		<div style={{ width: '100%', height: '400px' }} id='map'></div>
	</div>
	)
}

About.propTypes = {
}

export default About