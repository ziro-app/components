import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'
import { animateBox } from './animation'
import { box } from './styles'

const ToastNotification = ({ isOpen, setIsOpen, children, boxStyle }) => {
	useEffect(() => {
		if (isOpen) {
			const timeoutFunction = setTimeout(() => setIsOpen(false), 1000)
			return () => clearTimeout(timeoutFunction)
		}
	}, [isOpen])
	const propsBox = useSpring(animateBox(isOpen))
	if (isOpen) {
		return (
			<animated.div style={boxStyle ? {...boxStyle, ...propsBox} : {...box, ...propsBox}}>
				{children}
			</animated.div>
		)
	} else return null
}

ToastNotification.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
	children: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.arrayOf(PropTypes.element)
	]).isRequired,
	boxStyle: PropTypes.object
}

export default ToastNotification