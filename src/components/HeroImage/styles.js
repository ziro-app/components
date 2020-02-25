import { fontTitle, primaryColor } from '@ziro/theme'

export const

hero = {
	display: 'grid',
	gridRowGap: '20px',
	color: primaryColor
},

heroCall = {
	position: 'relative',
	fontFamily: fontTitle,
	fontSize: '3.6rem',
	fontWeight: '600',
	lineHeight: '1.2',
	textAlign: 'left',
	textTransform: 'uppercase'
},

marker = {
	position: 'absolute',
	bottom: '2px',
	left: '0',
	width: '300px',
	height: '14px',
	zIndex: '-1',
	background: 'rgba(255,228,0,0.55)'
},

heroText = {
	fontSize: '2.1rem',
	textAlign: 'start'
},

heroImg = {
	marginTop: '30px',
	width: '100%'
},

button = {
	display: 'grid',
	marginTop: '5px',
	width: window.innerWidth < 400 ? '55%' : '40%'
}