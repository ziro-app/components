import React from 'react'
import PropTypes from 'prop-types'
import { useLocation, Switch, Route } from 'wouter'
import { useTransition, animated } from 'react-spring'
import { wrapper } from './styles'

const Transition = ({ style, components }) => {
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
		<animated.div key={key} style={{ ...style, ...props }}>
			<Switch>
				{components.map(({ path, children }) =>
					<Route key={path} path={path}>
						<div style={wrapper}>{children}</div>
					</Route>
				)}
			</Switch>
		</animated.div>
	))
}

Transition.propTypes = {
	style: PropTypes.object,
	components: PropTypes.array.isRequired
}

export default Transition