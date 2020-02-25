import { fontTitle, primaryColor, gradient, shadow } from '@ziro/theme'

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
},

desktopContainer = {
	display: 'grid',
	gridTemplateColumns: '1fr 1fr',
	gridColumnGap: '50px',
	maxWidth: '1200px',
	boxSizing: 'border-box',
	margin: '0 auto',
	color: primaryColor
},

blockOne = {
	display: 'grid',
	gridRowGap: '20px',
	alignContent: 'center'
},

blockTwo = {
	display: 'grid',
	justifyItems: 'center'
},

desktopCall = {
	fontFamily: fontTitle,
	fontSize: '3.8rem',
	fontWeight: '600',
	lineHeight: '1.2',
	textAlign: 'left',
	textTransform: 'uppercase'
},

desktopMarker = {
	background: `linear-gradient(transparent 50%, rgba(255,228,0,1) 100%)`
},

desktopText = {
	fontSize: '2.4rem',
	textAlign: 'start'
},

desktopImage = {
	maxWidth: '500px'
},

desktopButton = {
	display: 'grid',
	width: '50%',
	marginTop: '5px',
},

btn = {
	display: 'block', // necessary for link version
	WebkitAppearance: 'none',
	WebkitTapHighlightColor: 'rgba(0,0,0,0)',
	MozAppearance: 'none',
	outline: 'none',
	cursor: 'pointer',
	width: '100%',
	padding: '10px 0px',
	border: 'none',
	borderRadius: '20px',
	fontFamily: fontTitle,
	fontSize: '1.8rem',
	color: '#FFF',
	background: gradient,
	boxShadow: `${shadow}`
}




















