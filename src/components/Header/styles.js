import { fontTitle, primaryColor, gradient } from '@ziro/theme'

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

containerSticky = hideButton => ({
	position: 'fixed',
	top: '0',
	display: 'grid',
	gridTemplateColumns: hideButton ? '20px 1fr' : 'auto 1fr 80px',
	alignItems: 'center',
	justifyItems: 'center',
	maxWidth: '500px',
	width: '100%',
	height: '50px',
	boxSizing: 'border-box',
	margin: '0',
	padding: '0 20px',
	fontFamily: fontTitle,
	color: primaryColor,
	background: 'white',
	boxShadow: '0px 2px 4px 0px rgba(34,34,34,0.25)'
}),

button = {
	display: 'block', // necessary for link version
	WebkitAppearance: 'none',
	WebkitTapHighlightColor: 'rgba(0,0,0,0)',
	MozAppearance: 'none',
	outline: 'none',
	cursor: 'pointer',
	width: '100%',
	padding: '8px 0px',
	border: 'none',
	borderRadius: '20px',
	fontFamily: fontTitle,
	fontSize: '1.2rem',
	color: '#FFF',
	textAlign: 'center',
	background: gradient,
	boxShadow: `rgba(34, 34, 34, 0.5) 0px 2px 15px -4px`
},

headerTitle = hideButton => ({
	marginLeft: hideButton ? '-20px' : '0'
})