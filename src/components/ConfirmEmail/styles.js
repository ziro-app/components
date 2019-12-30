import { fontTitle, fontSizeInput, gradient, shadow, primaryColor, grayColor4 } from '../../Theme/variables'

export const

container = {
	display: 'grid',
	gridRowGap: '40px',
	textAlign: 'center'
},

custom = (fontSize, color) => ({
	display: 'grid',
	justifyItems: 'center',
	fontSize: `${(fontSize + 2) / 10}rem`,
	fontWeight: '500',
	color: color
}),

blockOne = {
	display: 'grid',
	gridRowGap: '10px'
},

blockTwo = {
	display: 'grid',
	gridRowGap: '30px'
}