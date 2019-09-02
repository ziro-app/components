import React from 'react'
import PropTypes from 'prop-types'
import { header, name } from './styles'


const InputLabel = ({ hasBadge, badge }) =>
	<div style={header(hasBadge)}>
		<label style={name}>Nome</label>
		{hasBadge && badge}
		{display[uiState]}
	</div>

InputLabel.propTypes = {
	hasBadge: PropTypes.bool.isRequired,
	badge: PropTypes.element.isRequired
}

export default InputLabel