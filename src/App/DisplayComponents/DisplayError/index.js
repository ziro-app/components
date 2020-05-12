import React from 'react'
import Error from '../../../components/Error/index'
import { containerWithPadding, primaryColor } from '@ziro/theme'
import { useLocation } from 'wouter'

export const DisplayError = () => {
	const [, setLocation] = useLocation();

	return (
		<div style={containerWithPadding}>
			<Error style={{
				display: 'grid',
				gridRowGap: '15px',
				color: primaryColor,
				textAlign: 'center'
			}} backRoute='/abc' backRouteFunction={() => setLocation('/abc')} />
		</div>
	)
}

	// <Error />