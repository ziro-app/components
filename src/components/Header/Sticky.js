import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'wouter'
import { motion } from 'framer-motion'
import Button from '../Button/index'
import Icon from '../Icon/index'
import { containerSticky, button, headerTitle, svg } from './styles'
import { animate, transition } from './animation'

const Sticky = ({ title, hideButton, hideFilter }) => {
	const [, setLocation] = useLocation()
	const [scrollY, setScrollY] = useState(window.scrollY)
	const [showHeader, setShowHeader] = useState(true)
	useEffect(() => {
		const toggleHeader = () => setScrollY(prevScrollY => {
			if (prevScrollY > window.scrollY + 25) setShowHeader(true)
			if (prevScrollY < window.scrollY - 25) setShowHeader(false)
			return window.scrollY
		})
		window.addEventListener('scroll', toggleHeader)
		return () => window.removeEventListener('scroll', toggleHeader)
	}, [])
	return (
		<motion.div style={containerSticky(hideButton)} animate={animate(showHeader)} transition={transition}>
			{hideFilter ?
				null
				:
				<Icon type='filter' size={18} onClick={() => setLocation('/filtro')} style={{ cursor: 'pointer' }} />
			}
			<label style={headerTitle(hideButton)}>{title}</label>
			{hideButton ?
				<Link to='/'><Icon type='back' size={18} style={svg('/')} /></Link>
				:
				<Button type='link' cta='Comprar' navigate={() => setLocation('/cadastrar')} style={button} />
			}
		</motion.div>
	)
}

Sticky.propTypes = {
	title: PropTypes.string.isRequired,
	hideButton: PropTypes.bool,
	hideFilter: PropTypes.bool
}

export default Sticky