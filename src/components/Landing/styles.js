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

marker = {
	position: 'absolute',
	bottom: '6px',
	left: '0',
	width: '140px',
	height: '8px',
	zIndex: '-1',
	background: 'rgba(255,228,0,0.75)'
},

heroCall = {
	position: 'relative',
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
	marginTop: '30px',
	width: '100%'
},

button = {
	display: 'grid',
	marginTop: '5px',
	width: window.innerWidth < 400 ? '55%' : '40%'
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
	fontSize: '2rem',
	textAlign: 'center',
	textTransform: 'uppercase'
},

benefitsText = {
	fontSize: '1.8rem',
	textAlign: 'center'
},

clients = {
	margin: '80px 0'
},

bar = {
	margin: '30px auto 10px',
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
},

steps = {
	display: 'grid',
	gridRowGap: '30px'
},

title = {
	fontFamily: fontTitle,
	fontSize: '2.8rem',
	textAlign: 'center',
	textTransform: 'uppercase'
},

step = {
	display: 'grid',
	gridTemplateColumns: '30% 1fr'
},

number = {
	marginTop: '-20px',
	fontSize: '6.5rem'
},

block = {

},

stepCall = {
	fontFamily: fontTitle,
	fontSize: '2.1rem',
},

stepText = {
	textAlign: 'start'
},

location = {
	display: 'grid',
	justifyItems: 'center',
	gridRowGap: '20px',
	margin: '80px 0 20px',
},

address = {
	textAlign: 'center'
},

social = {
	display: 'grid',
	gridTemplateColumns: '1fr 1fr',
	gridColumnGap: '10px'
}