import { fontTitle, fontSizeInput, gradient, shadow, primaryColor, grayColor4 } from '../../Theme/variables'

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
}