import { fontTitle, fontSizeSmall, primaryColor } from '../../Theme/variables'

export const

card = width => ({
	display: 'grid',
	gridTemplateRows: '1fr 1fr 1fr 1fr',
	width: '100%',
	height: width/1.8,
	padding: '0 4%',
	boxSizing: 'border-box',
	border: `4px solid ${primaryColor}`,
	borderRadius: '15px',
	color: primaryColor,
	boxShadow: `rgba(34, 34, 34, 0.4) 0px 5px 15px -4px`
}),

brand = {
	justifySelf: 'end'
},

chip = {
	width: '30px',
	height: '20px',
	border: '2px solid rgb(34,34,34)',
	borderRadius: '3px'	
},

cardnumber = {
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