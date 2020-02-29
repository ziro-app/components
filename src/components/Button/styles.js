import { fontTitle, fontSizeInput, gradient, shadow, primaryColor, grayColor4 } from '@ziro/theme'

export const

btn = {
	display: 'block', // necessary for link version
	WebkitAppearance: 'none',
	WebkitTapHighlightColor: 'rgba(0,0,0,0)',
	MozAppearance: 'none',
	outline: 'none',
	cursor: 'pointer',
	width: '100%',
	padding: '10px 0px',
	border: 'none',
	borderRadius: '20px',
	fontFamily: fontTitle,
	fontSize: fontSizeInput,
	color: '#FFF',
	textAlign: 'center',
	background: gradient,
	boxShadow: `${shadow}`
},

btnDisabled = {
	...btn,
	cursor: 'initial',
	color: primaryColor,
	background: 'none',
	backgroundColor: grayColor4,
	boxShadow: 'none'
},

btnDestructive = {
	...btn,
	background: 'linear-gradient(#BA3A3A 10%, #B33 30%, #B22 60%, #800)'
},

btnLight = {
	...btn,
	background: 'linear-gradient(rgb(240, 240, 240) 10%, rgb(245, 245, 245) 30%, rgb(250, 250, 250) 60%, rgb(255, 255, 255))',
	color: '#000'
}