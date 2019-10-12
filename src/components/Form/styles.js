export const

container = {
	display: 'grid',
	gridRowGap: '2px'
},

submit = isError => ({
	height: '36px',
	textAlign: 'center',
	color: isError ? alertColor : successColor
})