export const animation = {
	from: location => {
		if (location === '/transition/1')
			return ({ opacity: 0, transform: `translate3d(-100%,0,0)` })
		return ({ opacity: 0, transform: `translate3d(100%,0,0)` })
	},
	enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
	leave: location => {
		if (location === '/transition/1')
			return ({ opacity: 0, transform: `translate3d(-50%,0,0)` })
		return ({ opacity: 0, transform: `translate3d(50%,0,0)` })
	},
	config: { tension: 270, friction: 24 }
}