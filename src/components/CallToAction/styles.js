import { fontTitle, fontSizeSmall, primaryColor, secondaryColor } from '../../Theme/variables'

export const

container = {
	display: 'grid',
	alignItems: 'end',
	height: '100vh',
	boxSizing: 'border-box',
	padding: '20px 5% 0',
	color: 'white',
	background: `
		linear-gradient(
			rgba(34,34,34,0.35) 8%,
			rgba(34,34,34,0.4) 16%,
			rgba(34,34,34,0.45) 24%,
			rgba(34,34,34,0.5) 32%,
			rgba(34,34,34,0.55) 40%,
			rgba(34,34,34,0.6) 48%,
			rgba(34,34,34,0.65) 56%,
			rgba(34,34,34,0.8) 64%,
			rgba(34,34,34,0.9) 72%,
			rgba(34,34,34,0.95) 80%,
			rgba(34,34,34,1) 90%
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
	marginBottom: '70px'
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
	marginBottom: '15px'
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