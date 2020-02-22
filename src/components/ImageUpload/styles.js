import { fontTitle, fontSizeInput, gradient, shadow, primaryColor, grayColor3 } from '@ziro/theme'

export const

dropzone = {
	display: 'grid',
	alignContent: 'center',
	justifyItems: 'center',
	gridRowGap: '15px',
	border: `2px dashed ${grayColor3}`,
	borderRadius: '6px',
	color: primaryColor,
	textAlign: 'center'
},

button = {
	display: 'block', // necessary for link version
	WebkitAppearance: 'none',
	WebkitTapHighlightColor: 'rgba(0,0,0,0)',
	MozAppearance: 'none',
	outline: 'none',
	cursor: 'pointer',
	width: '90%',
	padding: '10px 0px',
	border: 'none',
	borderRadius: '20px',
	fontFamily: fontTitle,
	fontSize: fontSizeInput,
	color: '#FFF',
	background: gradient,
	boxShadow: `${shadow}`
},

input = {
	opacity: 0
},

styleTag = `
	.dropzone {
		height: 100%;
		height: -webkit-fill-available;
		height: -moz-available;
	}
`