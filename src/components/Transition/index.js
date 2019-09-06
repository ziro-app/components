import React from 'react'
import PropTypes from 'prop-types'
import { useLocation, Link, Switch, Route } from 'wouter'
import { useTransition, animated } from 'react-spring'
import { container, child } from './styles'

const Transition = ({ components }) => {
	const [location] = useLocation()
	const transitions = useTransition(location, key => key, {
		from: location => {
			if (location === '/transition/1')
				return ({ opacity: 0, transform: `translate3d(-100%,0,0)` })
			return ({ opacity: 0, transform: `translate3d(100%,0,0)` })
		},
		enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
		leave: location => {
			if (location === '/transition/1')
				return ({ opacity: 0, transform: `translate3d(-50%,0,0)` })
			return ({ opacity: 0, transform: `translate3d(50%,0,0)` })
		},
		config: { tension: 270, friction: 24 }
	})
	return transitions.map(({ props, key }) => (
		<animated.div key={key} style={{ ...container, ...props }}>
			<Switch>
				{components.map(({ path, children }) =>
					<Route key={path} path={path}>
						<div style={{ position: 'absolute' }}>{children}</div>
					</Route>
				)}
			</Switch>
		</animated.div>
	))
}

Transition.propTypes = {
	components: PropTypes.array.isRequired
}

export default Transition