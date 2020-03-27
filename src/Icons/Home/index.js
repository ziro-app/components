import React from 'react'
import PropTypes from 'prop-types'
import { primaryColor } from '@ziro/theme'

export const Home = ({ size = 50, color = primaryColor, strokeWidth = 2, fill = false }) =>
	<svg width={size} height={size} viewBox="0 0 24 24" fill={fill ? primaryColor : "none"} stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
		<path d="M3,9 L12,2 L21,8 L21,20 C21,21.1045695 20.1045695,22 19,22 L15.0756644,22 L15.0756644,12 L8.99760089,12 L8.99760089,22 L5,22 C3.8954305,22 3,21.1045695 3,20 L3,9 Z"/>
	</svg>

Home.propTypes = {
	size: PropTypes.number,
	color: PropTypes.string
}