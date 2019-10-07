import React from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'
import { animateContainer, animateOverlay } from './animation'
import { container, overlay, disableScroll } from './styles'

const Modal = ({ isOpen, setIsOpen, children }) => {
	const propsContainer = useSpring(animateContainer(isOpen))
	const propsOverlay = useSpring(animateOverlay(isOpen))
	return (
		<>
			<animated.div style={{...container, ...propsContainer}}>{children}</animated.div>
			{isOpen && <animated.div style={{...overlay, ...propsOverlay}} onClick={setIsOpen}></animated.div>}
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