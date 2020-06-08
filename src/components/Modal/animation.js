export const

animateOverlay = isOpen => ({
	opacity: isOpen ? 1 : 0,
	config: { tension: 320, friction: 32 }
}),

animateBox = (isOpen, degrees, scale) => {
	if (scale)
		return {
			transform: `scale(${scale}) rotate(${degrees ? `${degrees}deg` : '0deg'})`,
			config: { tension: 450, friction: 32 }			
		}
	return {
		transform: `scale(${isOpen ? 1 : 0.8}) rotate(${degrees ? `${degrees}deg` : '0deg'})`,
		config: { tension: 450, friction: 32 }
	}
}