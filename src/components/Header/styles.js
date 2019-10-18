import { fontTitle, primaryColor } from '../../Theme/variables'

export const

container = oneColumn => ({
	display: 'grid',
	gridTemplateColumns: oneColumn ? '1fr' : '30px 1fr',
	justifyItems: 'center',
	margin: '0 auto 30px'
}),

svg = isClickable => ({
	justifySelf: 'start',
	cursor: isClickable ? 'pointer' : 'auto'
}),

text = oneColumn => ({
	margin: oneColumn ? '0' : '0 0 0 -30px',
	fontFamily: fontTitle,
	color: primaryColor
})