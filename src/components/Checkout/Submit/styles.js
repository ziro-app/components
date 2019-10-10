import { fontTitle, primaryColor } from '../../../Theme/variables'

export const

container = {
	display: 'grid',
	gridRowGap: '15px',
	color: primaryColor
},

svg = {
	justifySelf: 'center'
},

title = {
	fontFamily: fontTitle,
	textTransform: 'uppercase'
},

modalSubmitting = {
	padding: '2%',
	boxSizing: 'border-box',
	borderRadius: '3px',
	background: 'white',
	boxShadow: `1px 0px 8px 0px rgba(34,34,34,0.15), 1px 0px 8px 0px rgba(34,34,34,0.10),
	1px 0px 8px 0px rgba(34,34,34,0.05)`
},

modalResult = {
	width: '85%',
	padding: '8%',
	boxSizing: 'border-box',
	borderRadius: '3px',
	textAlign: 'center',
	background: 'white',
	boxShadow: `1px 0px 8px 0px rgba(34,34,34,0.15), 1px 0px 8px 0px rgba(34,34,34,0.10),
	1px 0px 8px 0px rgba(34,34,34,0.05)`
}