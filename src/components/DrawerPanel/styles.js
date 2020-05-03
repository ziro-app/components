import { fontTitle, fontBody, fontSizeInput, fontSizeSmall, primaryColor, grayColor1 } from '@ziro/theme'

export const

header = v2style => ({
	display: 'grid',
	gridRowGap: '3px',
	padding: v2style ? '0' : '20px 0 10%'
}),

welcome = v2style => ({
	fontFamily: fontTitle,
	fontSize: v2style ? '1.9rem' : '1.8rem',
	fontWeight: '600',
	color: primaryColor
}),

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
	background: 'rgba(255,228,0,0.75)'
}),

name = {
	position: 'absolute',
	maxWidth: '150px',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	textOverflow: 'ellipsis'
},

cnpj = v2style => ({
	fontSize: v2style ? '1.4rem' : fontSizeSmall,
	color: grayColor1
}),

nav = v2style => ({
	display: 'grid',
	gridRowGap: v2style ? '20px' : '25px',
	marginTop: v2style ? '25px' : '20px'
}),

navlink = v2style => ({
	display: 'grid',
	gridTemplateColumns: 'auto 1fr',
	gridColumnGap: v2style ? '20px' : '10px',
	alignItems: 'center'
}),

navicon = v2style => ({
	display: 'grid',
	alignItems: 'center',
	justifyItems: 'center',
	width: v2style ? '35px' : '30px',
	height: v2style ? '35px' : '30px',
	borderRadius: '100%',
	boxShadow: `0px 3px 11px -4px rgba(34,34,34,0.7)`
}),

navtext = v2style => ({
	fontFamily: fontTitle,
	fontSize: v2style ? '1.6rem' : fontSizeInput,
	fontWeight: '600',
	textTransform: 'uppercase',
	color: primaryColor,
	cursor: 'pointer'
}),

navsoon = {
	fontFamily: fontBody,
	fontSize: '1.1rem',
	fontStyle: 'italic',
	color: primaryColor,
	textTransform: 'lowercase'
}