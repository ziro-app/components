import { fontTitle, primaryColor, secondaryColor, grayColor4 } from '@ziro/theme'

export const

container = {
	display: 'grid',
	gridRowGap: '12px',
	color: primaryColor
},

titleStyle = {
	fontFamily: fontTitle,
	textTransform: 'uppercase',
	fontSize: '1.5rem',
	background: `linear-gradient(transparent 90%, rgba(34,34,34,1) 100%)`
},

dot = {
  fontSize: '21px',
  color: secondaryColor
},

body = (numberOfColumns, customGrid) => ({
	display: 'grid',
	gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`,
	alignItems: 'end',
	justifyItems: 'center',
	gridRowGap: '5px',
	...customGrid,
}),

cellHeader = {
	fontFamily: fontTitle,
	fontSize: '1.4rem'
},

cell = {
	fontSize: '1.4rem'
},

cellTotal = {
	width: '100%',
	fontSize: '1.4rem',
	textAlign: 'center',
	background: grayColor4
}