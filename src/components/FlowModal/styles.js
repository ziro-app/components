import { fontTitle, successColor, alertColor, primaryColor, otherColor } from '@ziro/theme'

const titleColor = {
	default: otherColor,
	success: successColor,
	error: alertColor
}

export const

container = {
	display: 'grid',
	gridRowGap: '15px',
	color: primaryColor
},

svg = {
	justifySelf: 'center'
},

title = (type) => ({
	fontFamily: fontTitle,
	textTransform: 'uppercase',
	color: titleColor[type]||otherColor
}),

modal = {
	zIndex: '999',
	display: 'grid',
	gridTemplateColumns: '80%',
	justifyContent: 'center',
	maxWidth: '300px',
	width: '85%',
	paddingBottom: '40px',
	borderRadius: '3px',
	textAlign: 'center',
	background: 'white',
	boxShadow: `1px 0px 8px 0px rgba(34,34,34,0.15), 1px 0px 8px 0px rgba(34,34,34,0.10),
	1px 0px 8px 0px rgba(34,34,34,0.05)`
}