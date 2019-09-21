import { fontTitle, fontSizeSmall, primaryColor, secondaryColor, grayColor1, shadow } from '../../Theme/variables'

export const

card = {
	display: 'grid',
	width: '100%',
	height: 256/1.6,
	padding: '0 4%',
	boxSizing: 'border-box',
	margin: '0 auto',
	border: `4px solid ${primaryColor}`,
	borderRadius: '15px',
	color: primaryColor,
	boxShadow: shadow
},

chip = {
	alignSelf: 'end',
	width: '30px',
	height: '20px',
	border: '2px solid rgb(34,34,34)',
	borderRadius: '3px'	
},

number = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	fontFamily: fontTitle
},

info = {
	display: 'grid',
	gridTemplateColumns: '1fr auto auto',
	gridColumnGap: '15px'
},

header = {
	fontFamily: fontTitle,
	fontSize: fontSizeSmall,
	textTransform: 'uppercase'
}