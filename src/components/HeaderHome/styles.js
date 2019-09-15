import { fontTitle, fontSizeSmall, primaryColor } from '../../Theme/variables'

export const

container = {
	display: 'grid',
	gridTemplateColumns: 'auto 1fr',
	placeItems: 'center end',
	margin: '0 auto 30px'
},

link = whiteText => ({
	fontFamily: fontTitle,
	fontSize: fontSizeSmall,
	color: whiteText ? 'white' : primaryColor,
	textDecoration: 'underline'
})