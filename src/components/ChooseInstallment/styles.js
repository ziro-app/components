  
import { fontTitle, fontSizeSmall, fontWeightTitle } from '@ziro/theme'

export const

container = {
	display: 'grid',
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

header = {
	fontFamily: fontTitle,
	textAlign: 'center'
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
},

tripleRow = {
	...doubleRow,
	gridTemplateColumns: '1fr 1.5fr',
	padding: '20px 0px'
},

middleItem = {
	textAlign: 'center',
	fontSize: fontSizeSmall
},

totalRow = {
	display: 'grid',
	gridTemplateColumns: '1fr 1fr',
	borderTop: '2px solid black'
}