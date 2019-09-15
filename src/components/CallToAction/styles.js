import { fontTitle, fontSizeNormal, primaryColor, secondaryColor } from '../../Theme/variables'

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
	gridRowGap: '10px'
},

pill = {
	justifySelf: 'start',
	padding: '4px 10px',
	borderRadius: '20px',
	fontFamily: fontTitle,
	fontSize: '1.2rem',
	fontWeight: '600',
	color: primaryColor,
	textTransform: 'uppercase',
	backgroundColor: secondaryColor

},

call = {
	justifySelf: 'start'
},

btn = {
	justifySelf: 'start'
}