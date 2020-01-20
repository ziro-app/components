import { fontTitle, fontSizeInput, primaryColor } from '../../Theme/variables'

export const

container = {
	display: 'grid',
	gridRowGap: '30px',
	textAlign: 'center',
	color: primaryColor
},

btnWhite = {
	WebkitAppearance: 'none',
	WebkitTapHighlightColor: 'rgba(0,0,0,0)',
	MozAppearance: 'none',
	outline: 'none',
	cursor: 'pointer',
	padding: '10px 0px',
	border: 'none',
	borderRadius: '20px',
	fontFamily: fontTitle,
	fontSize: fontSizeInput,
	color: primaryColor,
	background: `linear-gradient(rgb(244, 244, 244) 10%, rgb(247, 247, 247) 30%, rgb(250, 250, 250) 60%, rgb(255, 255, 255))`,
	boxShadow: `rgba(34, 34, 34, 0.45) 0px 2px 15px -4px,rgba(34, 34, 34, 0.25) 0px 2px 15px -4px`
}