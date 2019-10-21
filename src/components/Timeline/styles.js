import { fontTitle, fontSizeInput, fontSizeSmall, primaryColor, alertColor, grayColor1, grayColor2, grayColor4 } from '../../Theme/variables'

export const

transaction = {
	position: 'relative',
	display: 'grid',
	borderLeft: `3px ${grayColor4} solid`,
	marginLeft: '7px',
	padding: '0 0 40px 20px',
	cursor: 'pointer',
	gridTemplate: `
		'supplier value'
		'status date'
		/ 60% 40%`
},

supplier = {
	gridArea: 'supplier',
	marginTop: '-4px',
	fontSize: fontSizeInput,
	cursor: 'pointer'
},

value = {
	gridArea: 'value',
	justifySelf: 'end',
	marginTop: '-4px',
	fontSize: fontSizeInput,
	cursor: 'pointer'	
},

status = {
	gridArea: 'status',
	fontFamily: fontTitle,
	fontSize: '1.2rem',
	color: grayColor2,
	cursor: 'pointer'
},

pending = {
	...status,
	color: alertColor
},

date = {
	gridArea: 'date',
	justifySelf: 'end',
	fontSize: fontSizeSmall,
	color: grayColor1,
	cursor: 'pointer'
},

after = `.timeline::after {
	content: ' ';
	position: absolute;
	top: 0px;
	left: -8px;
	width: 10px;
	height: 10px;
	border: 2px solid ${primaryColor};
	border-radius: 50%;
	background-color: #FFF;
	box-shadow: 0px 5px 15px -2px rgba(34,34,34,0.55);
}`