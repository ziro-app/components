import { fontBody, fontSizeInput, primaryColor, grayColor1 } from '../../Theme/variables'

export const

container = {
	position: 'relative'
},

close = {
	position: 'absolute',
	top: '10px',
	right: '20px',
	display: 'grid'
},

modal = {
	position: 'absolute',
	display: 'grid',
	overflowY: 'scroll',
	boxSizing: 'border-box',
	width: '100%',
	maxHeight: '120px',
	margin: '1px auto 0',
	padding: '10px 20px',
	border: `2px solid ${grayColor1}`,
	borderRadius: '8px',
	fontFamily: `${fontBody}, 'system-ui', 'sans-serif'`,
	color: primaryColor,
	backgroundColor: '#FDFDFD',
	boxShadow: `rgba(34,34,34,0.3) 0px 3px 10px -3px`
},

data = {
	padding: '5px 0',
	fontSize: fontSizeInput
}