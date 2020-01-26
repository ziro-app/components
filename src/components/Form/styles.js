import { alertColor, successColor } from '@ziro/theme'

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
}),

submitTop = isError => ({
	marginTop: '15px',
	height: '36px',
	textAlign: 'center',
	color: isError ? alertColor : successColor
})