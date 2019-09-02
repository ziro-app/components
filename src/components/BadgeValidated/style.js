export const

container = (fontSize, color) => ({
	display: 'grid',
	gridTemplateColumns: 'auto 1fr',
	alignItems: 'center',
	gridColumnGap: '2px',
	fontSize: `${fontSize/10}rem`,
	color: color
}),