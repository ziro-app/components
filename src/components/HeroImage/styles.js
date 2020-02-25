import { fontTitle, primaryColor, gradient, shadow } from '@ziro/theme'

export const

container = device => ({
	display: 'grid',
	gridTemplateColumns: device === 'phone' ? '1fr' : '1fr 1fr',
	gridRowGap: '40px',
	gridColumnGap: '50px',
	maxWidth: device === 'phone' ? '500px' : '1200px',
	boxSizing: 'border-box',
	margin: '0 auto',
	color: primaryColor
}),

blockOne = {
	display: 'grid',
	gridRowGap: '20px',
	alignContent: 'center'
},

blockTwo = {
	display: 'grid',
	justifyItems: 'center'
},

callToAction = device => ({
	fontFamily: fontTitle,
	fontSize: device === 'phone' ? '3.2rem' : '3.8rem',
	fontWeight: '600',
	lineHeight: '1.2',
	textAlign: 'left',
	textTransform: 'uppercase'
}),

marker = {
	background: `linear-gradient(transparent 55%, rgba(255,228,0,1) 100%)`
},

explainer = device => ({
	fontSize: device === 'phone' ? '2.1rem' : '2.4rem',
	textAlign: 'start'
}),

btnContainer = device => ({
	display: 'grid',
	width: device === 'phone' ? '60%' : '50%',
	marginTop: '5px',
}),

btn = device => ({
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
	fontSize: device === 'phone' ? '1.5rem' : '1.8rem',
	color: '#FFF',
	background: gradient,
	boxShadow: `${shadow}`
}),

image = device => ({
	maxWidth: '500px',
	width: device === 'phone' ? '90%' : '100%'
})