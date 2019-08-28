import { primaryColor, grayColor1, grayColor3 } from '../../Theme/variables'

export const input = {
	WebkitAppearance: 'none',
	MozAppearance: 'none',
	outline: 'none',
	padding: '8px 22px',
	border: `2px solid ${grayColor3}`,
	borderRadius: '8px',
	color: primaryColor,
	backgroundColor: '#FDFDFD',
	boxShadow: `rgba(34,34,34,0.3) 0px 3px 10px -3px`
},

focus = `.input-text:focus {
	border: 2px solid ${grayColor1} !important;
	box-shadow: rgba(34, 34, 34, 0.3) 0px 3px 10px -2px !important;
}`