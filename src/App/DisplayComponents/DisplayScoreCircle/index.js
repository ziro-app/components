import React from 'react'
import ScoreCircle from '../../../components/ScoreCircle/index'
import { containerWithPadding } from '@ziro/theme'

export const DisplayScoreCircle = () => {
	const DEFAULT_STEP_COLORS = [
		'#d12000',
		'#eb2400',
		'#ed8d00',
		'#ff9b07',
		'#f1bc00',
		'#ffcf25',
		'#84c42b',
		// '#53b83a',
		'#3da940'
	]
	return (
		<div style={containerWithPadding}>
			<ScoreCircle
				value={400}
				maxValue={900}
				width={200}
				lineWidth={15}
				lineSpacing={1}
				lineGap={1}
				maxAngle={180}
				rotation={90}
				stepsColors={DEFAULT_STEP_COLORS}
				fadedOpacity={25}
				style={{}}
				textStyle={{}}
			/>
		</div>
	)
}