import { fontTitle, fontSizeSmall, primaryColor, grayColor1 } from '../../Theme/variables'

export const

container = {
	height: '100vh',
	boxSizing: 'border-box',
	padding: '20px 10% 0',
	borderRight: `20px solid ${primaryColor}`
},

header = {
	display: 'grid'
},

user = {
	display: 'grid',
	padding: '3% 0 10%'
},

name = {
	fontFamily: fontTitle,
	fontSize: '1.8rem'
},

word = {
	position: 'relative'
},

color = width => ({
	position: 'absolute',
	top: '68%',
	left: '5%',
	width: width,
	height: '6px',
	zIndex: '-1',
	background: 'rgba(255,228,0,0.5)'
}),

cnpj = {
	fontSize: fontSizeSmall,
	color: grayColor1
},

nav = {
	display: 'grid',
	gridRowGap: '25px',
	marginTop: '20px'
},

navlink = {
	display: 'grid',
	gridTemplateColumns: 'auto 1fr',
	gridColumnGap: '15px',
	alignItems: 'center'
},

icon = {
	display: 'grid',
	placeItems: 'center',
	width: '28px',
	height: '28px',
	borderRadius: '100%',
	boxShadow: `0px 3px 11px -4px rgba(34,34,34,0.7)`
},

text = {
	fontFamily: fontTitle,
	fontSize: '1.5rem',
	fontWeight: '600',
	textTransform: 'uppercase',
	color: primaryColor,
	cursor: 'pointer'
}