import React from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'
import { animateOverlay, animateBox } from './animation'
import { container, box, overlay, disableScroll } from './styles'

const Modal = ({ isOpen, setIsOpen, children, boxStyle, degrees }) => {
	const propsOverlay = useSpring(animateOverlay(isOpen))
	const propsBox = useSpring(animateBox(isOpen, degrees))
	if (isOpen) {
		return (
			<div style={container}>
				<animated.div style={boxStyle ? { ...boxStyle, ...propsBox } : { ...box, ...propsBox }}>
					{children}
				</animated.div>
				<animated.div style={{ ...overlay, ...propsOverlay }} onClick={setIsOpen}></animated.div>
				<style>{disableScroll}</style>
			</div>
		)
	} else return null
}

Modal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
	children: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.arrayOf(PropTypes.element)
	]).isRequired,
	boxStyle: PropTypes.object,
	degrees: PropTypes.number
}

export default Modal