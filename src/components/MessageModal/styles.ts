export const

container: React.CSSProperties = {
	zIndex: 9999,
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

box: React.CSSProperties = {
	zIndex: 999,
	maxWidth: '350px',
	width: '90%',
	margin: '0 auto',
	padding: '20px 20px 40px',
	boxSizing: 'border-box',
	borderRadius: '3px',
	background: 'white',
	boxShadow: `1px 0px 8px 0px rgba(34,34,34,0.15), 1px 0px 8px 0px rgba(34,34,34,0.10),
	1px 0px 8px 0px rgba(34,34,34,0.05)`
},

overlay: React.CSSProperties = {
	position: 'fixed' as const,
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