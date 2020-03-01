import { fontTitle, fontSizeInput, gradient, shadow, primaryColor, grayColor4 } from '@ziro/theme'

export const

container = {
	maxWidth: '500px',
	minHeight: '100vh',
	boxSizing: 'border-box',
	margin: '0 auto',
	padding: '20px 20px 60px',
	background: 'white',
	display: 'grid'
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

radio = {
	WebkitAppearance: 'none',
	MozAppearance: 'none',
	MsAppearance: 'none',
	OAppearance: 'none',
	appearance: 'none',
	WebkitTapHighlightColor: 'rgba(0,0,0,0)',
	outline: 'none',
	width: '15px',
	height: '15px',
	border: `1px solid ${primaryColor}`,
	borderRadius: '50%'
},

radioSelected = {
	...radio,
	background: primaryColor,
	boxShadow: shadow
},

apply = {
	alignSelf: 'end',
	display: 'grid',
	gridTemplateColumns: '1fr 1fr',
	gridColumnGap: '15px'
}