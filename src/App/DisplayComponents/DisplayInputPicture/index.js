import React, { useState } from 'react'
import InputPicture from '../../../components/InputPicture/index'
import { containerWithPadding } from '@ziro/theme'

export const DisplayInputPicture = () => {
	const [picture, setPicture] = useState('')
	return (
		<div style={containerWithPadding}>
			<InputPicture
				picture={picture}
				setPicture={setPicture}
			/>
		</div>
	)
}