import React, { Fragment } from 'react'
import { Link } from 'wouter'
import Transition from '../../../components/Transition/index'
import { nav, component } from './styles'

export const DisplayTransition = () => {
	return (
		<Fragment>
			<div style={nav}>
				<Link to='/transition/1'>Prev</Link>
				<Link to='/transition/2'>Next</Link>
			</div>
			<Transition components={[
				{ path: '/transition/1', children: <div style={component}>Opção usuário</div> },
				{ path: '/transition/2', children: <div style={component}>Outra rota</div> }
			]}/>
		</Fragment>
	)
}