import { fontTitle } from '../../Theme/variables'

export const

header = threeColumn => ({
	display: 'grid',
	gridTemplateColumns: threeColumn ? 'auto auto 1fr' : 'auto 1fr',
	gridColumnGap: '6px',
	placeItems: 'end',
	height: '20px'
}),

name = {
	fontFamily: fontTitle,
	fontSize: '1.2rem',
	textTransform: 'uppercase'
}