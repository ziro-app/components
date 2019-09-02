import { fontBody, fontSizeNormal, primaryColor, grayColor2 } from '../../Theme/variables'

export const

container = {
	color: primaryColor
},

save = {
	cursor: 'pointer',
	padding: '2px 8px',
	border: `1px solid rgb(74,74,74)`,
	borderRadius: '2px',
	textTransform: 'uppercase'
},

spinner = {
	animation: 'spin 0.6s linear infinite',
	justifySelf: 'end'
},

inputInline = {
	WebkitAppearance: 'none',
	MozAppearance: 'none',
	outline: 'none',
	padding: '4px 0 0',
	border: 'none',
	fontFamily: fontBody,
	fontSize: fontSizeNormal,
	color: primaryColor
},

inputStylesheet = `
	input:disabled {
		background: none;
	}
	input::placeholder {
	   	color: ${grayColor2};
	}
`