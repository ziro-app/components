import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'wouter'
import { motion } from 'framer-motion'
import Button from '../Button/index'
import Icon from '../Icon/index'
import { containerSticky, button, headerTitle } from './styles'
import { animate, transition } from './animation'

const Sticky = ({ title }) => {
	const [, setLocation] = useLocation()
	const [scrollY, setScrollY] = useState(window.scrollY)
	const [showHeader, setShowHeader] = useState(true)
	useEffect(() => {
		const toggleHeader = () => setScrollY(prevScrollY => {
			if (prevScrollY > window.scrollY) setShowHeader(true)
			else setShowHeader(false)
			return window.scrollY
		})
		window.addEventListener('scroll', toggleHeader)
		return () => window.removeEventListener('scroll', toggleHeader)
	}, [])
	return (
		<motion.div style={containerSticky} animate={animate(showHeader)} transition={transition}>
			<Button type='link' cta='Comprar' navigate={() => setLocation('/cadastrar')} style={button} />
			<label style={headerTitle}>{title}</label>
			<Icon type='filter' size={18} onClick={() => setLocation('/filtro')} />
		</motion.div>
	)
}

Sticky.propTypes = {
	title: PropTypes.string.isRequired
}

export default Sticky