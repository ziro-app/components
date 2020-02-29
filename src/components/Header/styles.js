import { fontTitle, primaryColor } from '@ziro/theme'

export const

container = oneColumn => ({
	display: 'grid',
	gridTemplateColumns: oneColumn ? '1fr' : '30px 1fr',
	justifyItems: 'center',
	margin: '0 auto 30px'
}),

svg = isClickable => ({
	WebkitTapHighlightColor: `rgba(0,0,0,0)`,
	justifySelf: 'start',
	cursor: isClickable ? 'pointer' : 'auto'
}),

text = oneColumn => ({
	margin: oneColumn ? '0' : '0 0 0 -30px',
	fontFamily: fontTitle,
	color: primaryColor
}),

containerSticky = showHeader => ({
	position: 'fixed',
	top: '0',
	left: '0',
	display: 'grid',
	alignItems: 'center',
	justifyItems: 'center',
	width: '100%',
	height: '40px',
	margin: '0',
	fontFamily: fontTitle,
	color: primaryColor,
	opacity: showHeader ? 1 : 0,
	background: 'white',
	boxShadow: '0px 2px 4px 0px rgba(34,34,34,0.25)'
})