import React from 'react'
import PropTypes from 'prop-types'
import { container, menuOptions, option } from './styles'

const MenuHover = props => {
	return (
		<div style={container}>
			<div style={menuOptions}>
				<label style={option}>Preços</label>
				<label style={option}>Trend</label>
				<label style={option}>Mais</label>
			</div>
		</div>
	)
}

MenuHover.propTypes = {

}

export default MenuHover