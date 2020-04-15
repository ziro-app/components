export const

animateBox = isOpen => ({
	transform: `scale(${isOpen ? 1 : 0.8})`,
	config: { tension: 450, friction: 32 }
})