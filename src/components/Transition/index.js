import React from 'react'
import PropTypes from 'prop-types'
import { useLocation, Link, Switch, Route } from 'wouter'
import { useTransition, animated } from 'react-spring'
import { container, child } from './styles'

const Transition = () => {
	const [location] = useLocation()
	const transitions = useTransition(location, key => key, {
		from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
		enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
		leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
	})
	console.log(transitions)
	return (
		<div style={container}>
			<Link to='/transition/1'>Back</Link>
			<Link to='/transition/2'>Next</Link>
			{transitions.map(({ item, props, key }) => (
				<animated.div key={key} style={props}>
					<Switch>
						<Route path='/transition/1'><div style={child}>1</div></Route>
						<Route path='/transition/2'><div style={child}>2</div></Route>
					</Switch>
				</animated.div>
			))}
		</div>
	)
}

Transition.propTypes = {
}

export default Transition