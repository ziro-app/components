import React from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'
import { animateOverlay, animateBox } from './animation'
import { overlay, box, disableScroll } from './styles'

const Modal = ({ isOpen, setIsOpen, children }) => {
	const propsOverlay = useSpring(animateOverlay(isOpen))
	const propsBox = useSpring(animateBox(isOpen))
	return (
		<>
			{isOpen && <animated.div style={{...overlay, ...propsOverlay}} onClick={setIsOpen}>
				<animated.div style={{...box, ...propsBox}}>
					{children}
				</animated.div>
			</animated.div>}
			{isOpen && <style>{disableScroll}</style>}
		</>
	)
}

Modal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
	children: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.arrayOf(PropTypes.element)
	]).isRequired
}

export default Modal