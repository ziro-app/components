import { fontTitle } from '@ziro/theme'

export const

	container = {
		display: 'grid',
		justifyItems: 'center'
	},

	scoreValue = (scoreValuePosition, scoreValueColor) => ({
		position: 'relative',
		left: '0',
		bottom: scoreValuePosition,
		margin: '0 auto',
		fontFamily: fontTitle,
		color: scoreValueColor,
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis'
	}),

	scoreText = scoreValueColor => ({
		display: 'grid',
		fontSize: '1.5rem',
		fontWeight: '700',
		color: scoreValueColor,
		textAlign: 'center',
		textTransform: 'uppercase'
	})