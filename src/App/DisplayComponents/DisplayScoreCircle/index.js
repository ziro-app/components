import React from 'react'
import ScoreCircle from '../../../components/ScoreCircle/index'
import { containerWithPadding } from '@ziro/theme'

export const DisplayScoreCircle = () => {
	const DEFAULT_STEP_COLORS = [
		'#a50a0a',
		'#bc0b0b',
		'#eb0e0e',
		'#e68c06',
		'#ff9b07',
		'#f8d823',
		'#ebeb09',
		'#5deb3e',
		'#35e60e',
		'#2fcc0c',
	]
	return (
		<div style={containerWithPadding}>
			<ScoreCircle
				value={900}
				maxValue={1000}
				width={230}
				lineWidth={20}
				lineSpacing={1}
				lineGap={1}
				maxAngle={210}
				rotation={90}
				stepsColors={DEFAULT_STEP_COLORS}
				fadedOpacity={25}
			/>
		</div>
	)
}
