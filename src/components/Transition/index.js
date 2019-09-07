import React from 'react'
import PropTypes from 'prop-types'
import { useLocation, Switch, Route } from 'wouter'
import { useTransition, animated } from 'react-spring'
import { animation } from './animation'
import { wrapper } from './styles'

const Transition = ({ style, components }) => {
	const [location] = useLocation()
	const transitions = useTransition(location, key => key, animation(components[0].path))
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