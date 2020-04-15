export const

container = {
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
	zIndex: '9999',
	maxWidth: '500px',
	width: '100%',
	padding: '20px',
	boxSizing: 'border-box',
	borderRadius: '3px',
	background: 'white',
	boxShadow: `1px 0px 8px 0px rgba(34,34,34,0.15), 1px 0px 8px 0px rgba(34,34,34,0.10),
	1px 0px 8px 0px rgba(34,34,34,0.05)`
},

overlay = {
	position: 'fixed',
	top: '0',
	left: '0',
	width: '100%',
	height: '100%'
},

disableScroll = `
	body {
		overflow: hidden;
	}
`