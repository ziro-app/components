import { fontTitle, fontSizeSmall } from '../../Theme/variables'

export const

header = threeColumn => ({
	display: 'grid',
	gridTemplateColumns: threeColumn ? 'auto auto 1fr' : 'auto 1fr',
	gridColumnGap: '6px',
	placeItems: 'end',
	height: '22px'
}),

text = {
	fontFamily: fontTitle,
	fontSize: fontSizeSmall,
	textTransform: 'uppercase'
}