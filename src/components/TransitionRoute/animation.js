export const animation = forward => ({
	from: () => ({ opacity: 0, transform: `translateX(${forward ? '100%' : '-100%'})` }),
	enter: { opacity: 1, transform: 'translateX(0%)' },
	leave: () => ({ opacity: 0, transform: `translateX(${forward ? '-100%' : '100%'})` }),
	config: { tension: 1200, friction: 62 }
})