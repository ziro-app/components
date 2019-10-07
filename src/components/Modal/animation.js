export const

animateContainer = isOpen => ({
	transform: `scale(${isOpen ? 0.8 : 1})`,
	config: { tension: 320, friction: 32 }
}),

animateOverlay = isOpen => ({
	opacity: isOpen ? 1 : 0,
	config: { tension: 320, friction: 32 }
})