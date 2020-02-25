import { fontTitle, primaryColor, gradient, shadow } from '@ziro/theme'

export const

container = device => ({
	display: 'grid',
	gridTemplateColumns: device === 'smallMobile' ? '1fr' : device === 'mobile' ? '1fr' : '1fr 1fr',
	gridRowGap: '40px',
	gridColumnGap: '50px',
	maxWidth: device === 'smallMobile' ? '500px' : device === 'mobile' ? '500px' : '1200px',
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
	fontSize: device === 'smallMobile' ? '2.8rem' : device === 'mobile' ? '3.2rem' : '3.8rem',
	fontWeight: '600',
	lineHeight: '1.2',
	textAlign: 'left',
	textTransform: 'uppercase'
}),

marker = {
	background: `linear-gradient(transparent 55%, rgba(255,228,0,1) 100%)`
},

explainer = device => ({
	fontSize: device === 'smallMobile' ? '1.8rem' : device === 'mobile' ? '2.1rem' : '2.4rem',
	textAlign: 'start'
}),

btnContainer = device => ({
	display: 'grid',
	width: device === 'smallMobile' ? '80%' : device === 'mobile' ? '50%' : '50%',
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
	fontSize: device === 'smallMobile' ? '1.4rem' : device === 'mobile' ? '1.5rem' : '1.8rem',
	color: '#FFF',
	background: gradient,
	boxShadow: `${shadow}`
}),

image = device => ({
	maxWidth: '500px',
	width: device === 'smallMobile' ? '95%' : device === 'mobile' ? '95%' : '100%'
})