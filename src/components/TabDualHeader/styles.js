import { fontTitle, fontSizeSmall, primaryColor, grayColor2 } from '../../../Theme/styleVariables'

export const

menu = {
	width: '100%',
	display: 'grid',
	gridTemplateColumns: '1fr 1fr',
	fontFamily: fontTitle
},

tab = {
	WebkitTapHighlightColor: 'rgba(0,0,0,0)',
	display: 'grid',
	placeItems: 'center',
	padding: '0 0 5px',
	fontSize: fontSizeSmall,
	textTransform: 'uppercase',
	color: grayColor2,
	borderBottom: `3px solid ${grayColor2}`
},

tabActive = {
	...tab,
	color: primaryColor,
	borderBottom: `3px solid ${primaryColor}`
}