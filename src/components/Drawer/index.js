import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'
import { animateContainer, animateOverlay } from './animation'
import { container, overlay } from './styles'

const Drawer = ({ isOpen, setIsOpen, children }) => {
	const propsContainer = useSpring(animateContainer(isOpen))
	const propsOverlay = useSpring(animateOverlay(isOpen))
	return (
		<Fragment>
			<animated.div style={{...container, ...propsContainer}}>{children}</animated.div>
			{isOpen && <animated.div style={{...overlay, ...propsOverlay}} onClick={setIsOpen}></animated.div>}
		</Fragment>
	)
}

Drawer.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	setIsOpen: PropTypes.func.isRequired,
	children: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.arrayOf(PropTypes.element)
	]).isRequired
}

export default Drawer