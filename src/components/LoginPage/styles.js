import { fontTitle, fontSizeSmall, primaryColor } from '@ziro/theme'

export const

welcome = {
	fontFamily: fontTitle,
	fontSize: '2.1rem'
},

subtitle = {
	fontSize: '1.4rem',
	textTransform: 'uppercase'
},

marker = {
	...subtitle,
	background: `linear-gradient(transparent 60%, rgba(255,228,0,0.75) 100%)`,
},

help = {
	display: 'grid',
	marginTop: '20px',
	fontFamily: fontTitle,
	fontSize: fontSizeSmall,
	color: primaryColor,
	textAlign: 'center',
	textDecoration: 'underline'
}