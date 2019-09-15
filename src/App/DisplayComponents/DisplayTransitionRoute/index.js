import React from 'react'
import TransitionRoute from '../../../components/TransitionRoute/index'
import { container, component } from './styles'

export const DisplayTransitionRoute = () => {
	return (
		<div style={container}>
			<TransitionRoute components={[
				{ path: '/transition/route-1', children: <div style={component}>Lorem Ipsum</div> },
				{ path: '/transition/route-2', children: <div style={component}>Dolor Sit</div> }
			]}/>
		</div>
	)
}