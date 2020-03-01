import { fontTitle, primaryColor } from '@ziro/theme'

export const

container = {
	maxWidth: '500px',
	minHeight: '100vh',
	boxSizing: 'border-box',
	margin: '0 auto',
	padding: '20px 20px 60px',
	background: 'white'
},

body = {
	display: 'grid',
	color: primaryColor
},

filter = {
	display: 'grid',
	gridRowGap: '10px'
},

description = {
	fontFamily: fontTitle
},

filterTag = {
	display: 'grid',
	gridRowGap: '4px'
},

option = {
	display: 'grid',
	gridTemplateColumns: '1fr auto',
	alignItems: 'center'
},

name = {
	fontWeight: 300
},

nameSelected = {
	...name,
	fontWeight: 500
},

apply = {
	display: 'grid',
	gridTemplateColumns: '1fr 1fr',
	gridColumnGap: '15px',
	margin: '40px 0 0'
}