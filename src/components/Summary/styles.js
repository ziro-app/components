  
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
	gridTemplateColumns: 'auto auto auto',
	padding: '20px 40px'
},

separatorRow = {
	...doubleRow,
	gridTemplateColumns: '1fr auto 1fr',
	padding: '0px'
},

separator = {
	height: '1px',
	margin: '10px',
	background: '#e0e0e0'
},

middleItem = {
	textAlign: 'center',
	fontSize: fontSizeSmall
},

content = {
	fontSize: fontSizeSmall,
	padding: '20px'
}