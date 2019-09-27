import { fontTitle, fontSizeSmall, primaryColor } from '../../Theme/variables'

export const

card = width => ({
	display: 'grid',
	gridTemplateRows: '1fr 30px 30px 40px',
	width: '100%',
	height: width/1.8,
	padding: '0 5%',
	borderLeft: `8px solid ${primaryColor}`,
	boxSizing: 'border-box',
	borderRadius: '12px',
	color: primaryColor,
	boxShadow: `
		rgba(34, 34, 34, 0.4) 0px 0px 10px -4px,
		rgba(34, 34, 34, 0.35) 0px 5px 15px -1px
	`,
	background: `radial-gradient(ellipse at top right, #FFF 25%, #FBFBFB 50%, #FAFAFA 75%, #F9F9F9`
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
	alignItems: 'flex-end',
	justifyContent: 'space-between',
	fontFamily: fontTitle
},

info = {
	display: 'grid',
	gridTemplateColumns: '1fr auto',
	alignItems: 'center',
	gridColumnGap: '15px'
},

header = {
	fontFamily: fontTitle,
	fontSize: fontSizeSmall,
	textTransform: 'uppercase',
	textOverflow: 'ellipsis',
	overflow: 'hidden',
	whiteSpace: 'noWrap'
}