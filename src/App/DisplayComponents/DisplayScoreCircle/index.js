import React from 'react'
import ScoreCircle from '../../../components/ScoreCircle/index'
import { containerWithPadding } from '@ziro/theme'

export const DisplayScoreCircle = () => {
	const DEFAULT_STEP_COLORS = [
		'#BC4646',
		'#EB5757',
		'#FF9B07',
		'#FFAF39',
		'#FFCF25',
		'#FFE401',
		'#4BCA81',
		'#3CA267'
	]
	return (
		<div style={containerWithPadding}>
			<ScoreCircle
				value={900}
				maxValue={900}
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