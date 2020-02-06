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
	pathOne: PropTypes.string.isRequired,
	tabNameOne: PropTypes.string.isRequired,
	pathTwo: PropTypes.string.isRequired,
	tabNameTwo: PropTypes.string.isRequired
}

export default TabDualHeader