import { fontSizeInput, alertColor } from '../../Theme/variables'

export const

container = {
	display: 'grid',
	gridRowGap: '15px'
},

labelHeader = {
	display: 'grid',
	gridTemplateColumns: 'auto 1fr',
	gridColumnGap: '3px',
	alignItems: 'center',
	paddingLeft: '5px'
},

dual = {
	display: 'grid',
	gridTemplateColumns: '1fr 1fr',
	gridColumnGap: '10px'
},

errorBlock = {
	display: 'grid',
	alignItems: 'center',
	justifyItems: 'center',
	margin: '15px auto',
	fontSize: fontSizeInput,
	color: alertColor
},

errorMsg = {
	display: 'grid',
	gridTemplateColumns: 'auto 1fr',
	alignItems: 'center'
},

modalBox = {
	display: 'grid',
	padding: '2%',
	boxSizing: 'border-box',
	borderRadius: '3px',
	cursor: 'pointer',
	background: 'white',
	boxShadow: `1px 0px 8px 0px rgba(34,34,34,0.15), 1px 0px 8px 0px rgba(34,34,34,0.10),
	1px 0px 8px 0px rgba(34,34,34,0.05)`
}