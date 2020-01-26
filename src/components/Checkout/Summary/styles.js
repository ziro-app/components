import { fontTitle, fontSizeSmall, fontWeightMuted, primaryColor } from '@ziro/theme'

export const

container = {
	margin: '20px 0 0',
	padding: '15px 0 0',
	borderTop: `2px solid ${primaryColor}`,
	color: primaryColor
},

summary = {
	display: 'grid'
},

title = {
	fontFamily: fontTitle,
	fontSize: fontSizeSmall,
	textTransform: 'uppercase',
	marginBottom: '10px'
},

service = {
	display: 'grid',
	gridTemplateColumns: '1fr 1fr'
},

total = {
	justifySelf: 'end'
},

amount = {
	justifySelf: 'end',
	fontSize: fontSizeSmall,
	fontWeight: fontWeightMuted
}