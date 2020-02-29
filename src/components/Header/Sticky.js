import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { containerSticky, text } from './styles'

const Sticky = ({ title }) => {
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
		<label style={containerSticky(showHeader)}>{title}</label>
	)
}

Sticky.propTypes = {
	title: PropTypes.string.isRequired
}

export default Sticky