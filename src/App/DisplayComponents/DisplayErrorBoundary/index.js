import React, { useEffect } from 'react'
import ErrorBoundary from '../../../components/ErrorBoundary/index'
import { container } from '../../../Theme/variables'

const BuggyComponent = () => {
	useEffect(() => { throw 'Error' }, [])
	return	<div style={container}>This is an error boundary</div>
}

export const DisplayErrorBoundary = () =>
	<ErrorBoundary>
		<BuggyComponent />
	</ErrorBoundary>