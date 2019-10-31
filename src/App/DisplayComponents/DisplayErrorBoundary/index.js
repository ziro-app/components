import React from 'react'
import ErrorBoundary from '../../../components/ErrorBoundary/index'
import { container } from '../../../Theme/variables'

export const DisplayErrorBoundary = () =>
	<ErrorBoundary>
		<div style={container}>This is an error boundary</div>
	</ErrorBoundary>