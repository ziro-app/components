import React from 'react'
import PropTypes from 'prop-types'
import { instructions } from './styles'

const Submenu = ({ options }) =>
	<div>
		<label style={instructions}>Escolha a ferramenta desejada</label>
		{options}
	</div>

Submenu.propTypes = {
	options: PropTypes.array.isRequired
}

export default Submenu