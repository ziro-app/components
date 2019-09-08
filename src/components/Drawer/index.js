import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import { container } from './styles'

const Drawer = () => {
	const [isOpen, setIsOpen] = useState(true)
	const props = useSpring({ transform: `translateX(${isOpen ? '0%' : '-100%'})` })
	return (
		<animated.div style={{...container, ...props}}>
			Drawer
		</animated.div>
	)
}

export default Drawer