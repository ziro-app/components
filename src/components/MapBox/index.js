import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import { container } from './styles'

const MapBox = ({ apiToken, center, zoom }) => {
	useEffect(() => {
		mapboxgl.accessToken = apiToken || process.env.MAPBOX_API
		const map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v11',
			center: center,
			zoom: zoom
		})
	}, [])
	return <div style={container} id='map'></div>
}

MapBox.propTypes = {
	apiToken: PropTypes.string,
	center: PropTypes.array,
	zoom: PropTypes.number
}

export default MapBox