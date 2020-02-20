  
import { fontTitle, fontSizeSmall, fontSizeNormal, fontWeightTitle } from '@ziro/theme'

export const

container = {
	display: 'grid',
	padding: 10
},

title = {
	fontFamily: fontTitle,
	fontSize: 30,
	fontWeight: fontWeightTitle,
	textTransform: 'uppercase',
},

subTitle = {
	fontFamily: fontTitle,
	fontSize: 20
},

values = {
	fontFamily: fontTitle,
	fontSize: 16
},

doubleRow = {
	display: 'grid',
	gridTemplateColumns: 'auto auto',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '20px',
},

tripleRow = {
	...doubleRow,
	gridTemplateColumns: '1fr 2fr 3fr'
},

separatorRow = {
	...doubleRow,
	gridTemplateColumns: '1fr auto 1fr',
	padding: '0px'
},

leadingItem = {
	textAlign: 'start'
},

middleItem = {
	textAlign: 'center',
	fontSize: fontSizeSmall
},

trailingItem = {
	textAlign: 'end'
}



// title = {
// 	fontFamily: fontTitle,
// 	fontSize: fontSizeSmall,
// 	textTransform: 'uppercase',
// 	marginBottom: '10px'
// },

// sellerTitle = {
// 	fontFamily: fontTitle,
// 	fontSize: fontSizeNormal,
// 	textTransform: 'uppercase',
// 	marginBottom: '10px'
// },

// service = {
// 	display: 'grid',
// 	gridTemplateColumns: '1fr 1fr',
// 	marginBottom: '10px',
// 	alignItems: 'center',
// },

// total = {
// 	justifySelf: 'end'
// },

// installmentsRow = {
// 	display: 'grid',
// 	gridTemplateColumns: '1fr 1fr 1fr',
// 	marginBottom: '10px',
// 	alignItems: 'center',
// },

// midText = {
// 	justifySelf: 'center',
// 	fontSize: fontSizeSmall
// },

// totalAfterInstallments = {
// 	justifySelf: 'end',
// 	fontSize: fontSizeSmall
// },

// totalAfterInstallmentsTitle = {
// 	fontSize: fontSizeSmall
// },

// totalRow = {
// 	display: 'grid',
// 	gridTemplateColumns: '1fr 1fr',
// 	marginBottom: '10px',
// 	alignItems: 'center',
// 	borderTop: `2px solid black` , 
// 	paddingTop: 20,
// 	marginTop: 20
// }