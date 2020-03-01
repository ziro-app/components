import { fontTitle, primaryColor } from '@ziro/theme'

export const

container = {
	maxWidth: '500px',
	minHeight: '100vh',
	boxSizing: 'border-box',
	margin: '0 auto',
	padding: '20px 20px 60px',
	background: 'white',
	display: 'grid',
	color: primaryColor
},

filter = {
	display: 'grid',
	gridRowGap: '15px',
	alignContent: 'start'
},

description = {
	marginBottom: '5px',
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
	alignSelf: 'end',
	display: 'grid',
	gridTemplateColumns: '1fr 1fr',
	gridColumnGap: '15px'
}