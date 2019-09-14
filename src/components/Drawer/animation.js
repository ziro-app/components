export const

animateContainer = isOpen => ({
	transform: `translateX(${isOpen ? '0%' : '-120%'})`,
	config: { tension: 320, friction: 32 }
}),

animateOverlay = isOpen => ({
	opacity: isOpen ? 1 : 0,
	config: { tension: 320, friction: 32 }
})