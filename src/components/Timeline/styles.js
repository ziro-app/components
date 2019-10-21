import { fontTitle, alertColor, successColor, fontWeightMuted, grayColor2 } from '../../Theme/variables'

export const

container = {
	display: 'grid',
	maxWidth: '400px',
	margin: '20px auto 0',
	fontSize: '1.4rem'
},

transaction = {

	display: 'grid',
	borderLeft: `1px ${alertColor} solid`,
	padding: '0 0 40px 30px',
	gridTemplate: `
		'status date'
		'supplier supplier'
		'value value'
		'quantity quantity'
		/ 70% 30%`
},

transaction2 = {
	...transaction,
	borderLeft: `1px ${successColor} solid`,
},

transaction3 = {
	...transaction,
	borderLeft: `1px ${grayColor2} solid`,
	gridTemplate: `
		'supplier supplier date'
		'value value value'
		'quantity quantity quantity'
		/ 35% 35% 30%`
},

circle = {

	left: '-1.3%',
	width: '7px',
	height: '7px',
	borderRadius: '50%',
	backgroundColor: alertColor
},

circle2 = {
	...circle,
	backgroundColor: successColor
},

circle3 = {
	...circle,
	backgroundColor: grayColor2
},

status = {
	gridArea: 'status',
	alignSelf: 'top',
	fontFamily: fontTitle,
	fontWeight: '600',
	fontSize: '0.9rem',
	textTransform: 'uppercase',
	color: alertColor
},

status2 = {
	...status,
	color: successColor
},

status3 = {
	...status,
	color: grayColor2
},

supplier = {
	gridArea: 'supplier',
},

value = {
	gridArea: 'value',
},

date = {
	gridArea: 'date',
	justifySelf: 'end',
	fontSize: '1.2rem',
	fontWeight: fontWeightMuted
},

quantity = {
	gridArea: 'quantity',
	fontSize: '1.2rem',
	fontWeight: fontWeightMuted
}