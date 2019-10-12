import { alertColor, successColor } from '../../Theme/variables'

export const

container = {
	display: 'grid',
	gridRowGap: '15px'
},

labelHeader = {
	paddingLeft: '5px'
},

error = {
	display: 'grid',
	gridTemplateColumns: 'auto 1fr'
},

submit = isError => ({
	textAlign: 'center',
	color: isError ? alertColor : successColor
})