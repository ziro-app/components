import React from 'react'
import PropTypes from 'prop-types'
import { useLocation, Link } from 'wouter'
import { menu, tab, tabActive } from './styles'

const TabDualHeader = ({ pathOne, pathTwo, tabNameOne, tabNameTwo }) => {
	const [location] = useLocation()
	return (
		<div style={menu}>
			<Link style={location === pathOne ? tabActive : tab} href={pathOne}>
				{tabNameOne}
			</Link>
			<Link style={location === pathTwo ? tabActive : tab} href={pathTwo}>
				{tabNameTwo}
			</Link>
		</div>
	)
}

TabDualHeader.propTypes = {
	/** Refere-se a URL do conteúdo 1 */
	pathOne: PropTypes.string.isRequired,
	/** Refere-se ao nome que será exibido no primeiro campo */
	tabNameOne: PropTypes.string.isRequired,
	/** Refere-se a URL do conteúdo 2 */
	pathTwo: PropTypes.string.isRequired,
	/** Refere-se ao nome que será exibido no segundo campo */
	tabNameTwo: PropTypes.string.isRequired
}

export default TabDualHeader