import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'
import { animateBox } from './animation'
import { box } from './styles'

const ToastNotification = ({ isOpen, setIsOpen, children, boxStyle }) => {
	useEffect(() => {
		const hideAfterTimeout = () => {
			setTimeout(() => setIsOpen(false), 3000)
		}
		if (isOpen) hideAfterTimeout()
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