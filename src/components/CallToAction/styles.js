import { fontTitle, fontSizeNormal, fontSizeSmall, primaryColor, secondaryColor } from '../../Theme/variables'

export const

container = {
	display: 'grid',
	alignItems: 'end',
	height: '100vh',
	boxSizing: 'border-box',
	padding: '20px 5% 0',
	fontSize: fontSizeNormal,
	color: 'white',
	background: `
		linear-gradient(
			rgba(34,34,34,0.1) 8%,
			rgba(34,34,34,0.2) 16%,
			rgba(34,34,34,0.3) 24%,
			rgba(34,34,34,0.4) 32%,
			rgba(34,34,34,0.5) 40%,
			rgba(34,34,34,0.6) 48%,
			rgba(34,34,34,0.7) 56%,
			rgba(34,34,34,0.8) 64%,
			rgba(34,34,34,0.9) 72%,
			rgba(34,34,34,0.95) 80%,
			rgba(34,34,34,1) 90%
		),
		center / cover
		url('https://res.cloudinary.com/ziro/image/upload/v1568509821/home-cta_sa7tom.jpg')
	`
},

content = {
	display: 'grid',
	gridRowGap: '6px',
	marginBottom: '60px'
},

pill = {
	justifySelf: 'start',
	padding: '4px 10px',
	borderRadius: '10px',
	fontFamily: fontTitle,
	fontSize: '1.1rem',
	fontWeight: '500',
	color: primaryColor,
	textTransform: 'uppercase',
	backgroundColor: secondaryColor

},

call = {
	justifySelf: 'start',
	textAlign: 'start',
	fontSize: '1.7rem',
	marginBottom: '10px'
},

btn = {
	padding: '10px 0px',
	border: '1px solid white',
	borderRadius: '4px',
	fontSize: fontSizeSmall,
	fontWeight: '500',
	textAlign: 'center',
	textTransform: 'uppercase'
}