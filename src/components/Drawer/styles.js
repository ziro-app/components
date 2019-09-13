import { primaryColor } from '../../Theme/variables'

export const

container = {
	zIndex: '9999',
	position: 'fixed',
	top: '0',
	left: '0',
	width: '100%',
	height: '100vh',
	padding: '20px 10% 0',
	boxSizing: 'border-box',
	borderRight: `20px solid ${primaryColor}`,
	overflowY: 'scroll',
	background: 'white',
	boxShadow: `1px 0px 8px 0px rgba(34,34,34,0.2), 1px 0px 8px 0px rgba(34,34,34,0.15),
	1px 0px 8px 0px rgba(34,34,34,0.10), 1px 0px 8px 0px rgba(34,34,34,0.05)`
}