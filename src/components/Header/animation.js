export const

animate = showHeader => ({
	translateY: !!showHeader ? '0px' : '-100px'
}),

transition = {
	type: 'spring',
	damping: 150,
	stiffness: 500
}