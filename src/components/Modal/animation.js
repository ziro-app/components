export const

animateContainer = isOpen => ({
	transform: `scale(${isOpen ? 1 : 0.8})`,
	config: { tension: 450, friction: 22 }
}),

animateOverlay = isOpen => ({
	opacity: isOpen ? 1 : 0,
	config: { tension: 320, friction: 32 }
})