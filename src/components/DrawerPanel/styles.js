import { fontTitle, fontSizeSmall, primaryColor, grayColor1 } from '../../Theme/variables'

export const

header = {
	display: 'grid',
	gridRowGap: '3px',
	padding: '4% 0 10%'
},

welcome = {
	fontFamily: fontTitle,
	fontSize: '1.8rem'
},

word = {
	position: 'relative'
},

color = width => ({
	position: 'absolute',
	top: '68%',
	left: '0',
	width: width,
	height: '6px',
	zIndex: '-1',
	background: 'rgba(255,228,0,0.5)'
}),

name = {
	position: 'absolute',
	maxWidth: '180px',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	textOverflow: 'ellipsis'
},

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

navicon = {
	display: 'grid',
	placeItems: 'center',
	width: '28px',
	height: '28px',
	borderRadius: '100%',
	boxShadow: `0px 3px 11px -4px rgba(34,34,34,0.7)`
},

navtext = {
	fontFamily: fontTitle,
	fontSize: '1.5rem',
	fontWeight: '600',
	textTransform: 'uppercase',
	color: primaryColor,
	cursor: 'pointer'
}