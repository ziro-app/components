import React from 'react'
import ScoreCircle from '../../../components/ScoreCircle/index'
import { containerWithPadding } from '@ziro/theme'

export const DisplayScoreCircle = () => {
	const DEFAULT_STEP_COLORS = [
		'#ff0000',
		'#BC4646',
		'#EB5757',
		'#FFE401',
		'#FFCF25',
		'#FFAF39',
		'#FF9B07',
		'#4BCA81',
		'#3CA267',
		'#23fa1b',
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