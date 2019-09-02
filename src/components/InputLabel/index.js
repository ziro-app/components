import React from 'react'
import PropTypes from 'prop-types'
import { header, name } from './styles'


const InputLabel = ({ hasBadge, badge, hasUiState, displayUiState }) =>
	<div style={header(hasBadge)}>
		<label style={name}>Nome</label>
		{hasBadge && badge}
		{hasUiState && displayUiState}
	</div>

InputLabel.propTypes = {
	hasBadge: PropTypes.bool.isRequired,
	badge: PropTypes.element.isRequired,
	hasUiState: PropTypes.bool.isRequired,
	displayUiState: PropTypes.element.isRequired
}

export default InputLabel