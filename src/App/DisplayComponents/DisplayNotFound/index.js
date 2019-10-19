import React from 'react'
import NotFound from '../../../components/NotFound/index'
import { containerWithPadding } from '../../../Theme/variables'

export const DisplayNotFound = () =>
	<div style={containerWithPadding}>
		<NotFound fallback='/home' />
	</div>