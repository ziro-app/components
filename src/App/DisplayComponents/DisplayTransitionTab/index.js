import React, { Fragment } from 'react'
import { Link } from 'wouter'
import TransitionTab from '../../../components/TransitionTab/index'
import { nav, component } from './styles'

export const DisplayTransitionTab = () => {
	return (
		<Fragment>
			<div style={nav}>
				<Link to='/transition/1'>Prev</Link>
				<Link to='/transition/2'>Next</Link>
			</div>
			<TransitionTab components={[
				{ path: '/transition/1', children: <div style={component}>Rota 1</div> },
				{ path: '/transition/2', children: <div style={component}>Rota 2</div> }
			]}/>
		</Fragment>
	)
}