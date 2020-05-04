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

bodyStyle = {
	display: 'grid',
	gridRowGap: '6px'
},

info = {
	display: 'grid',
	gridTemplateColumns: '1fr 1fr 1fr 1fr',
},

cell = {
	fontSize: '1.5rem'
}