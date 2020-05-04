import { fontTitle, fontSizeSmall } from '@ziro/theme'

export const

container = (maxWidth, height) => ({
	display: 'grid',
	alignItems: 'center',
	justifyItems: 'center',
	width: '100%',
	maxWidth: maxWidth ? maxWidth : '250px',
	height: height ? height : '32px',
	margin: '0 auto',
	borderRadius: '25px',
	boxShadow: `1px 0px 8px 0px rgba(34,34,34,0.15), 1px 0px 8px 0px rgba(34,34,34,0.10),
	1px 0px 8px 0px rgba(34,34,34,0.05)`
}),

menuOptions = numberOfColumns => ({
	display: 'grid',
	gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)`,
	justifyItems: 'center',
	width: '100%'
}),

name = {
	fontFamily: fontTitle,
	fontSize: '1.4rem'
}