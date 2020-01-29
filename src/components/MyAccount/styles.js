import { fontTitle, fontSizeInput, primaryColor, secondaryColor, gradient, shadow } from '@ziro/theme'

export const

container = {
	display: 'grid',
	gridRowGap: '30px',
	marginTop: '40px',
	color: primaryColor,
	fontWeight: '500',
	textAlign: 'center'
},

optionWhite = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	WebkitAppearance: 'none',
	WebkitTapHighlightColor: 'rgba(0,0,0,0)',
	MozAppearance: 'none',
	outline: 'none',
	cursor: 'pointer',
	width: '100%',
	padding: '6px 0',
	borderRadius: '25px',
	fontFamily: fontTitle,
	fontSize: fontSizeInput,
	color: primaryColor,
	background: `linear-gradient(rgb(244, 244, 244) 10%, rgb(247, 247, 247) 30%, rgb(250, 250, 250) 60%, rgb(255, 255, 255))`,
	boxShadow: `rgba(34, 34, 34, 0.45) 0px 2px 15px -4px,rgba(34, 34, 34, 0.25) 0px 2px 15px -4px`
},

option = {
	...optionWhite,
	color: 'white',
	background: gradient,
	boxShadow: shadow

},

dot = {
	fontSize: '21px',
	color: secondaryColor
}