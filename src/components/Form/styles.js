import { alertColor, successColor } from '../../Theme/variables'

export const

container = {
	display: 'grid',
	gridRowGap: '2px'
},

whiteSpace = {
	height: '36px'
},

submit = isError => ({
	height: '36px',
	textAlign: 'center',
	color: isError ? alertColor : successColor
})