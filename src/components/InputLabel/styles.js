import { fontTitle, fontSizeSmall, primaryColor } from '../../Theme/variables'

export const

header = threeColumn => ({
	display: 'grid',
	gridTemplateColumns: threeColumn ? 'auto auto 1fr' : 'auto 1fr',
	gridColumnGap: '6px',
	alignItems: 'end',
	justifyItems: 'end',
	height: '22px',
	marginTop: '-3px'
}),

text = {
	fontFamily: fontTitle,
	fontSize: fontSizeSmall,
	color: primaryColor,
	textTransform: 'uppercase'
}