import React from 'react'
import Error from '../../../components/Error/index'
import { containerWithPadding, primaryColor } from '../../../Theme/variables'

export const DisplayError = () =>
	<div style={containerWithPadding}>
		<Error style={{
			display: 'grid',
			gridRowGap: '15px',
			color: primaryColor,
			textAlign: 'center'
		}}/>
	</div>
	// <Error />