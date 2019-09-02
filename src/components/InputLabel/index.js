import React from 'react'
import PropTypes from 'prop-types'
import { header, text } from './styles'


const InputLabel = ({ name, hasBadge, badge, hasUiState, displayUiState }) =>
	<div style={header(hasBadge)}>
		<label style={text}>{name}</label>
		{hasBadge && badge}
		{hasUiState && displayUiState}
	</div>

InputLabel.propTypes = {
	name: PropTypes.string.isRequired,
	hasBadge: PropTypes.bool.isRequired,
	badge: PropTypes.element.isRequired,
	hasUiState: PropTypes.bool.isRequired,
	displayUiState: PropTypes.element.isRequired
}

export default InputLabel