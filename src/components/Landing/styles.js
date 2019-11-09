import { fontTitle, primaryColor } from '../../Theme/variables'

export const

container = {
	display: 'grid',
	gridRowGap: '60px'
},

header = {
	display: 'grid',
	gridTemplateColumns: 'auto 1fr',
	alignItems: 'center',
	gridColumnGap: '10px',
	fontFamily: fontTitle
},

name = {
	fontSize: '2rem'
},

hero = {
	display: 'grid',
	gridRowGap: '5px'
},

heroCall = {
	fontFamily: fontTitle,
	fontSize: '3.2rem',
	lineHeight: '1.2',
	textAlign: 'left'
},

heroText = {
	fontSize: '2.1rem',
	textAlign: 'start'
},

heroImg = {
	width: '100%'
},

benefits = {
	display: 'grid',
	justifyItems: 'center'
},

benefitsImg = {
	width: '200px',
	marginBottom: '10px'
},

benefitsCall = {
	fontFamily: fontTitle,
	fontSize: '2rem'
},

benefitsText = {
	fontSize: '1.8rem',
	textAlign: 'center'
},

bar = {
	margin: '0 auto 10px',
	width: '40px',
	border: `2px solid ${primaryColor}`,
	borderRadius: '6px'
},

testimonial = {
	fontFamily: fontTitle,
	fontSize: '2.1rem',
	textAlign: 'center'
},

client = {
	marginTop: '10px',
	textAlign: 'right'
}