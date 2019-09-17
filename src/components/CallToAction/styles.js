import { fontTitle, fontSizeSmall, primaryColor, secondaryColor } from '../../Theme/variables'

export const

container = {
	display: 'grid',
	alignItems: 'end',
	height: '100%',
	boxSizing: 'border-box',
	padding: '20px 5% 0',
	color: 'white',
	background: `
		linear-gradient(
			rgba(0,0,0,0.25) 8%,
			rgba(0,0,0,0.3) 16%,
			rgba(0,0,0,0.35) 24%,
			rgba(0,0,0,0.4) 32%,
			rgba(0,0,0,0.45) 40%,
			rgba(0,0,0,0.5) 48%,
			rgba(0,0,0,0.55) 56%,
			rgba(0,0,0,0.6) 64%,
			rgba(0,0,0,0.65) 72%,
			rgba(0,0,0,0.7) 80%,
			rgba(0,0,0,0.85) 85%,
			rgba(0,0,0,0.9) 90%,
			rgba(0,0,0,0.95) 95%
		),
		center / cover
		url('https://res.cloudinary.com/ziro/image/upload/v1568509821/home-cta_sa7tom.jpg')
	`
},

header = {
	alignSelf: 'start',
	display: 'grid',
	gridTemplateColumns: 'auto 1fr',
	alignItems: 'center',
	justifyItems: 'end'
},

content = {
	display: 'grid',
	gridRowGap: '6px',
	marginBottom: '50px'
},

pill = {
	justifySelf: 'start',
	padding: '4px 10px',
	borderRadius: '10px',
	fontFamily: fontTitle,
	fontSize: '1.1rem',
	color: primaryColor,
	textTransform: 'uppercase',
	backgroundColor: secondaryColor

},

call = {
	textAlign: 'start',
	fontSize: '1.8rem',
	marginBottom: '30px'
},

btn = {
	padding: '10px 0px',
	border: '1px solid white',
	borderRadius: '25px',
	fontSize: fontSizeSmall,
	fontWeight: '500',
	color: 'white',
	textAlign: 'center',
	textTransform: 'uppercase'
}