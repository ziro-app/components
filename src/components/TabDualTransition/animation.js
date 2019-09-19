export const animation = pathOne => ({
	from: location => {
		if (location === pathOne)
			return ({ opacity: 0, transform: 'translateX(-100%)' })
		return ({ opacity: 0, transform: 'translateX(100%)' })
	},
	enter: { opacity: 1, transform: 'translateX(0%)' },
	leave: location => {
		if (location === pathOne)
			return ({ opacity: 0, transform: 'translateX(-1000%)' })
		return ({ opacity: 0, transform: 'translateX(1000%)' })
	},
	config: { tension: 1200, friction: 62 }
})