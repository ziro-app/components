import React, { useState } from 'react'
import { Link } from 'wouter'
import TransitionRoute from '../../../components/TransitionRoute/index'
import { containerWithPadding } from '../../../Theme/variables'
import { component, nav } from './styles'

export const DisplayTransitionRoute = () => {
	const [forward, setForward] = useState(true)
	return (
		<div style={containerWithPadding}>
			<TransitionRoute forward={forward} components={[
				{ path: '/transition/route-1',
				  children:
				  	<div style={component}>
				  		<div style={nav}>
				  			<Link to={null} onClick={null}>Prev</Link>
				  			<Link to='transition/route-2' onClick={() => setForward(true)}>Next</Link>
				  		</div>
				  		<div>Route 1 - Lorem Ipsum</div>
				  	</div>
				},
				{ path: '/transition/route-2',
				  children:
				  	<div style={component}>
				  		<div style={nav}>
				  			<Link to='transition/route-1' onClick={() => setForward(false)}>Prev</Link>
				  			<Link to='transition/route-3' onClick={() => setForward(true)}>Next</Link>
				  		</div>
				  		<div>Route 2 - Dolor Sit</div>
				  	</div>
				},
				{ path: '/transition/route-3',
				  children:
				  	<div style={component}>
				  		<div style={nav}>
				  			<Link to='transition/route-2' onClick={() => setForward(false)}>Prev</Link>
				  			<Link to='transition/route-4' onClick={() => setForward(true)}>Next</Link>
				  		</div>
				  		<div>Route 3 - Amet</div>
				  	</div>
				},
				{ path: '/transition/route-4',
				  children:
				  	<div style={component}>
				  		<div style={nav}>
				  			<Link to='transition/route-3' onClick={() => setForward(false)}>Prev</Link>
				  			<Link to={null} onClick={null}>Next</Link>
				  		</div>
				  		<div>Route 4 - Consectetur</div>
				  	</div>
				}
			]}/>
		</div>
	)
}