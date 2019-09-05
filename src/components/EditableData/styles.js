import { fontBody, fontSizeNormal, fontSizeSmall, primaryColor, grayColor2 } from '../../Theme/variables'

export const

container = {
	width: '100%',
	color: primaryColor
},

save = {
	WebkitAppearance: 'none',
	WebkitTapHighlightColor: 'rgba(0,0,0,0)',
	MozAppearance: 'none',
	outline: 'none',
	cursor: 'pointer',
	padding: '2px 8px',
	border: `1px solid rgb(74,74,74)`,
	borderRadius: '2px',
	fontFamily: fontBody,
	fontSize: '1.1rem',
	color: primaryColor,
	textTransform: 'uppercase',
	background: 'none'
},

spinner = {
	animation: 'spin 0.6s linear infinite',
	justifySelf: 'end'
},

inputInline = {
	WebkitAppearance: 'none',
	MozAppearance: 'none',
	outline: 'none',
	width: '100%',
	padding: '4px 0 0',
	border: 'none',
	fontFamily: `${fontBody}, 'system-ui', 'sans-serif'`,
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