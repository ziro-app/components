import React from 'react'
import ErrorLoading from '../../../components/ErrorLoading/index'
import { containerWithPadding } from '../../../Theme/variables'

export const DisplayErrorLoading = () =>
	<div style={containerWithPadding}>
		<ErrorLoading />
	</div>