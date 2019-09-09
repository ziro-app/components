import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import Icon from '../Icon/index'
import { container } from './styles'

const Drawer = ({ children }) => {
	const [isOpen, setIsOpen] = useState(true)
	const props = useSpring({ transform: `translateX(${isOpen ? '0%' : '-100%'})` })
	return (
		<animated.div style={{...container, ...props}}>
			<Icon type='close' />	
		</animated.div>
	)
}

export default Drawer