import { primaryColor } from '../../Theme/variables'

export const

overlay = {
	zIndex: '9999',
	position: 'fixed',
	top: '0',
	left: '0',
	display: 'grid',
	alignItems: 'center',
	justifyItems: 'center',
	width: '100%',
	height: '100vh',
	boxSizing: 'border-box',
	overflow: 'hidden',
	background: 'rgba(34,34,34,0.2)'
},

box = {
	width: '80%',
	padding: '5%',
	boxSizing: 'border-box',
	borderRadius: '3px',
	cursor: 'pointer',
	background: 'white',
	boxShadow: `1px 0px 8px 0px rgba(34,34,34,0.15), 1px 0px 8px 0px rgba(34,34,34,0.10),
	1px 0px 8px 0px rgba(34,34,34,0.05)`
},

disableScroll = `
	body {
		overflow: hidden;
	}
`