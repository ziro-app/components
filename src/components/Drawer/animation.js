export const animation = isOpen => ({
	transform: `translateX(${isOpen ? '0%' : '-120%'})`,
	config: { tension: 320, friction: 32 }
})