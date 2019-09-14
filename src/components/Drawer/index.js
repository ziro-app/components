import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'
import { animation } from './animation'
import { container, overlay } from './styles'

const Drawer = ({ isOpen, setIsOpen, children }) => {
	const props = useSpring(animation(isOpen))
	return (
		<Fragment>
			<animated.div style={{...container, ...props}}>{children}</animated.div>
			{isOpen && <div style={overlay} onClick={setIsOpen}></div>}
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