import { fontTitle, primaryColor } from '@ziro/theme'

export const

	hero = {
		display: 'grid',
		gridRowGap: '5px',
		color: primaryColor
	},

	heroCall = {
		position: 'relative',
		fontFamily: fontTitle,
		fontSize: '3.2rem',
		lineHeight: '1.2',
		textAlign: 'left'
	},

	marker = {
		position: 'absolute',
		bottom: '6px',
		left: '0',
		width: '140px',
		height: '8px',
		zIndex: '-1',
		background: 'rgba(255,228,0,0.75)'
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
		// Window is not defined in docz dev and build
		// width: window.innerWidth < 400 ? '55%' : '40%'
		width: '40%'
	}