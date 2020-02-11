import { fontTitle, fontSizeSmall, fontWeightMuted, primaryColor, fontSizeNormal } from '@ziro/theme'

export const

summary = {
	display: 'grid'
},

title = {
	fontFamily: fontTitle,
	fontSize: fontSizeSmall,
	textTransform: 'uppercase',
	marginBottom: '10px'
},

sellerTitle = {
	fontFamily: fontTitle,
	fontSize: fontSizeNormal,
	textTransform: 'uppercase',
	marginBottom: '10px'
},

service = {
	display: 'grid',
	gridTemplateColumns: '1fr 1fr',
	marginBottom: '10px',
	alignItems: 'center',
},

total = {
	justifySelf: 'end'
},

installmentsRow = {
	display: 'grid',
	gridTemplateColumns: '1fr 1fr 1fr',
	marginBottom: '10px',
	alignItems: 'center',
},

midText = {
	justifySelf: 'center',
	fontSize: fontSizeSmall
},

totalAfterInstallments = {
	justifySelf: 'end',
	fontSize: fontSizeSmall
},

totalAfterInstallmentsTitle = {
	fontSize: fontSizeSmall
},

totalRow = {
	display: 'grid',
	gridTemplateColumns: '1fr 1fr',
	marginBottom: '10px',
	alignItems: 'center',
	borderTop: `2px solid black` , 
	paddingTop: 20,
	marginTop: 20
}