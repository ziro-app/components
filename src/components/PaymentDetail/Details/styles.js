import { fontTitle, primaryColor, secondaryColor } from '@ziro/theme'

export const

container = {
	display: 'grid',
	gridRowGap: '40px',
	color: primaryColor
},

infoBlock = {
	display: 'grid',
	gridRowGap: '12px'
},

headerStyle = {
	fontFamily: fontTitle,
	textTransform: 'uppercase',
	fontSize: '1.5rem',
	background: `linear-gradient(transparent 90%, rgba(34,34,34,1) 100%)`
},

dot = {
  fontSize: '21px',
  color: secondaryColor
},

bodyStyle = {
	display: 'grid',
	gridRowGap: '6px'
},

info = {
	display: 'grid',
	gridTemplateColumns: '1fr 1fr'
},

titleStyle = {
	fontFamily: fontTitle,
	fontSize: '1.5rem'
},

contentStyle = color => ({
	justifySelf: 'end',
	fontSize: '1.5rem',
	fontWeight: color ? '500' : '400',
	color: color ? color : primaryColor
})