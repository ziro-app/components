import { fontBody, fontSizeInput, primaryColor, grayColor1 } from '@ziro/theme'

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
	zIndex: '1', // don't remove
	position: 'absolute',
	display: 'grid',
	alignContent: 'start',
	overflowY: 'scroll',
	boxSizing: 'border-box',
	width: '100%',
	maxHeight: '120px',
	margin: '1px auto 0',
	border: `2px solid ${grayColor1}`,
	borderRadius: '8px',
	fontFamily: `${fontBody}, 'system-ui', 'sans-serif'`,
	color: primaryColor,
	backgroundColor: '#FDFDFD',
	boxShadow: `rgba(34,34,34,0.3) 0px 3px 10px -3px`
},

data = isActive => ({
	WebkitAppearance: 'none',
	MozAppearance: 'none',
	outline: 'none',
	boxSizing: 'border-box',
	width: '100%',
	height: '30px',
	padding: '0 20px',
	border: 'none',
	fontFamily: `${fontBody}, 'system-ui', 'sans-serif'`,
	fontSize: fontSizeInput,
	color: primaryColor,
	backgroundColor: isActive ? '#F3F3F3' : '#FDFDFD'
})