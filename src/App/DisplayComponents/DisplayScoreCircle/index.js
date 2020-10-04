import React from 'react'
import ScoreCircle from '../../../components/ScoreCircle/index'
import { containerWithPadding } from '@ziro/theme'

export const DisplayScoreCircle = () => {
	const DEFAULT_STEP_COLORS = [
		'#d12000',
		'#ed8d00',
		'#f1bc00',
		'#84c42b',
		'#53b83a',
		'#3da940',
		'#3da940',
		'#3da940'
	]
	return (
		<div style={containerWithPadding}>
			<ScoreCircle
				value={100}
				maxValue={900}
				width={200}
				lineWidth={5}
				lineSpacing={5}
				lineGap={5}
				maxAngle={260}
				rotation={90}
				stepsColors={DEFAULT_STEP_COLORS}
				fadedOpacity={40}
				style={{}}
				textStyle={{}}
			/>
		</div>
	)
}