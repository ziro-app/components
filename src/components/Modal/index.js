import React from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'
import { animateOverlay, animateBox } from './animation'
import { container, box, overlay, disableScroll } from './styles'

const Modal = ({ isOpen, setIsOpen, children, boxStyle }) => {
	const propsOverlay = useSpring(animateOverlay(isOpen))
	const propsBox = useSpring(animateBox(isOpen))
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
	/** Propriedade que define o estado do componente (aberto/fechado) */
	isOpen: PropTypes.bool.isRequired,
	/** Função que altera o estado do componente */
	setIsOpen: PropTypes.func.isRequired,
	/** Array de objetos */
	children: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.arrayOf(PropTypes.element)
	]).isRequired,
	/** Propriedade que define o estilo do conteúdo do modal */
	boxStyle: PropTypes.object
}

export default Modal