  
import { fontTitle, fontSizeSmall, fontWeightTitle } from '@ziro/theme'

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

separator = {
	height: '1px',
	margin: '10px',
	background: '#e0e0e0'
},

middleItem = {
	textAlign: 'center',
	fontSize: fontSizeSmall
}