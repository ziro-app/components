import React from 'react'
import PropTypes from 'prop-types'
import { useLocation, Switch, Route } from 'wouter'
import { useTransition, animated } from 'react-spring'
import { animation } from './animation'
import { wrapper } from './styles'

const TabDualTransition = ({ style, components }) => {
	const [location] = useLocation()
	const transitions = useTransition(location, key => key, animation(components[0].path))
	return transitions.map(({ item, props, key }) => (
		<animated.div key={key} style={{ ...style, ...props }}>
			<Switch location={item}>
				{components.map(({ path, children }) =>
					<Route key={path} path={path}>
						<div style={wrapper}>{children}</div>
					</Route>
				)}
			</Switch>
		</animated.div>
	))
}

TabDualTransition.propTypes = {
	/** Refere-se a um objeto com estilos css */
	style: PropTypes.object,
	/** Refere-se a um Array de objetos contendo as informações de rota e conteúdo de cada uma das páginas da tabela */
	components: PropTypes.array.isRequired
}

export default TabDualTransition