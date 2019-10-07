import React from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'
import { animateOverlay, animateBox } from './animation'
import { container, overlay, disableScroll } from './styles'

const Modal = ({ isOpen, setIsOpen, children }) => {
	const propsOverlay = useSpring(animateOverlay(isOpen))
	const propsBox = useSpring(animateBox(isOpen))
	return (
		<>
			{isOpen && <animated.div style={{...container, ...propsOverlay}}>
				<animated.div style={{...overlay, ...propsBox}} onClick={setIsOpen}>
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