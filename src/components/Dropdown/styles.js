import { fontBody, fontSizeInput, primaryColor, grayColor1 } from '../../Theme/variables'

export const

container = {
	position: 'relative'
},

close = {
	position: 'absolute',
	right: '20px',
	display: 'grid',
	alignContent: 'center',
	height: '100%'
},

modal = {
	position: 'absolute',
	display: 'grid',
	alignContent: 'start',
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
	WebkitAppearance: 'none',
	MozAppearance: 'none',
	outline: 'none',
	boxSizing: 'border-box',
	width: '100%',
	height: '30px',
	border: 'none',
	fontFamily: `${fontBody}, 'system-ui', 'sans-serif'`,
	fontSize: fontSizeInput,
	color: primaryColor,
	backgroundColor: '#FDFDFD'
}