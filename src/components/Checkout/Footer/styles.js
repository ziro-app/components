import { fontTitle, fontSizeSmall, fontWeightMuted, primaryColor } from '../../../Theme/variables'

export const

container = {
	display: 'grid',
	gridRowGap: '25px',
	margin: '0 auto',
	padding: '15px 0',
	borderTop: '1px solid #F3f3f3',
	color: primaryColor
},

summary = {
	display: 'grid',
	marginBottom: '10px'
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
},

regulatory = {
	display: 'grid',
	justifyItems: 'center'
},

info = {
	fontFamily: fontTitle,
	fontSize: fontSizeSmall
}