import { primaryColor } from '../../Theme/variables'

export const

container = {
	zIndex: '9999',
	position: 'fixed',
	top: '0',
	left: '0',
	display: 'grid',
	gridTemplateColumns: '80%',
	alignContent: 'start',
	justifyContent: 'center',
	maxWidth: '300px',
	width: '75%',
	height: '100vh',
	boxSizing: 'border-box',
	borderRight: `10px solid ${primaryColor}`,
	overflow: 'hidden',
	background: 'white',
	boxShadow: `1px 0px 8px 0px rgba(34,34,34,0.15), 1px 0px 8px 0px rgba(34,34,34,0.10),
	1px 0px 8px 0px rgba(34,34,34,0.05)`
},

overlay = {
	zIndex: '999',
	position: 'fixed',
	top: '0',
	left: '0',
	width: '100%',
	height: '100vh',
	boxSizing: 'border-box',
	cursor: 'pointer',
	background: 'rgba(34,34,34,0.2)'
},

disableScroll = `
	body {
		overflow: hidden;
	}
`