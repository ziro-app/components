import { fontTitle, primaryColor, grayColor2 } from '../../Theme/variables'

export const

container = {
	height: '100vh',
	boxSizing: 'border-box',
	padding: '20px 10% 0'
},

user = {},

navlink = {
	display: 'grid',
	gridTemplateColumns: 'auto 1fr',
	gridColumnGap: '8px',
	alignItems: 'center'
},

icon = {
	display: 'grid',
	placeItems: 'center',
	width: '24px',
	height: '24px',
	borderRadius: '100%',
	boxShadow: `0px 3px 11px -4px rgba(34,34,34,0.7)`
},

text = {
	fontFamily: fontTitle,
	fontSize: '1.5rem',
	fontWeight: '600',
	textTransform: 'uppercase',
	color: primaryColor
}