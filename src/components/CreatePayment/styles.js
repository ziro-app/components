import { alertColor, successColor } from '../../Theme/variables'

export const

container = {
	display: 'grid',
	gridRowGap: '2px'
},

labelHeader = {
	paddingLeft: '5px'
},

error = {
	display: 'grid',
	gridTemplateColumns: 'auto 1fr'
},

submit = isError => ({
	height: '36px',
	textAlign: 'center',
	color: isError ? alertColor : successColor
})