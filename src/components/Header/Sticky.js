import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { text } from './styles'

const Sticky = ({ title }) => {
	useEffect(() => {
		const toggleHeader = () => {
			console.log(window.scrollY)
		}
		window.addEventListener('scroll', toggleHeader)
		return () => window.removeEventListener('scroll', toggleHeader)
	}, [])
	return (
		<h1 style={text(true)}>{title}</h1>
	)
}

Sticky.propTypes = {
	title: PropTypes.string.isRequired
}

export default Sticky