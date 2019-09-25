import { fontTitle, fontSizeSmall, primaryColor } from '../../Theme/variables'

export const

card = width => ({
	display: 'grid',
	gridTemplateRows: '1fr 1fr 1fr 1fr',
	width: '100%',
	height: width/1.8,
	padding: '0 4%',
	boxSizing: 'border-box',
	// border: `2px solid ${primaryColor}`,
	borderRadius: '12px',
	color: primaryColor,
	boxShadow: `
		rgba(34, 34, 34, 0.4) 0px 0px 10px -4px,
		rgba(34, 34, 34, 0.35) 0px 5px 15px -1px
	`,
	background: `linear-gradient(#FAFAFA 10%, #FBFBFB 30%, #FCFCFC 60%, #FFF)`
}),

brandLogo = {
	justifySelf: 'end'
},

chip = {
	width: '30px',
	height: '30px',
	background: `
		url('https://res.cloudinary.com/ziro/image/upload/v1569380926/chip_qurqrs.png')
		0 0 / 100% no-repeat`
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