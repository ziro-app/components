import { alertColor, successColor } from '../../Theme/variables'

export const

container = {
	display: 'grid',
	gridRowGap: '15px'
},

submit = isError => ({
	textAlign: 'center',
	color: isError ? alertColor : successColor
})