import { fontTitle, primaryColor, successColor, alertColor } from '@ziro/theme'

export const

container = {
	display: 'grid',
	gridRowGap: '15px',
	color: primaryColor
},

svg = {
	justifySelf: 'center'
},

titleSuccess = {
	fontFamily: fontTitle,
	textTransform: 'uppercase',
	color: successColor
},

titleError = {
	...titleSuccess,
	color: alertColor
}