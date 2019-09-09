import React from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'
import Icon from '../Icon/index'
import { container } from './styles'

const Drawer = ({ isOpen, setIsOpen, children }) => {
	const props = useSpring({ transform: `translateX(${isOpen ? '0%' : '-100%'})` })
	return (
		<animated.div style={{...container, ...props}}>
			<Icon type='close' onClick={() => setIsOpen(false)}/>	
		</animated.div>
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