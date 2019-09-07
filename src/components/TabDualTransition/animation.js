export const animation = pathOne => ({
	from: location => {
		if (location === pathOne)
			return ({ opacity: 0, transform: 'translateX(-100%)' })
		return ({ opacity: 0, transform: 'translateX(100%)' })
	},
	enter: { opacity: 1, transform: 'translateX(0%)' },
	leave: location => {
		if (location === pathOne)
			return ({ opacity: 0, transform: 'translateX(-40%)' })
		return ({ opacity: 0, transform: 'translateX(40%)' })
	},
	config: { tension: 270, friction: 24 }
})