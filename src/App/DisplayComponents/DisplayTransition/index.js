import React, { Fragment } from 'react'
import { Link } from 'wouter'
import Transition from '../../../components/Transition/index'
import { nav } from './styles'

export const DisplayTransition = () => {
	return (
		<Fragment>
			<div style={nav}>
				<Link to='/transition/1'>Back</Link>
				<Link to='/transition/2'>Next</Link>
			</div>
			<Transition components={[
				{ path: '/transition/1', children: '1' },
				{ path: '/transition/2', children: '2' }
			]}/>
		</Fragment>
	)
}