import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { containerSticky, text } from './styles'

const Sticky = ({ title }) => {
	useEffect(() => {
		const toggleHeader = () => {
			console.log(window.scrollY)
		}
		window.addEventListener('scroll', toggleHeader)
		return () => window.removeEventListener('scroll', toggleHeader)
	}, [])
	return (
		<label style={containerSticky}>{title}</label>
	)
}

Sticky.propTypes = {
	title: PropTypes.string.isRequired
}

export default Sticky