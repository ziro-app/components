import React from 'react'
import PropTypes from 'prop-types'
import { header, text } from './styles'


const InputLabel = ({ name, hasBadge, badge, hasUiState, displayUiState, styleHeader, styleText = text }) =>
	<div style={styleHeader || header(hasBadge)}>
		<label style={styleText}>{name}</label>
		{hasBadge && badge}
		{hasUiState && displayUiState}
	</div>

InputLabel.propTypes = {
	name: PropTypes.string.isRequired,
	hasBadge: PropTypes.bool,
	badge: PropTypes.element,
	hasUiState: PropTypes.bool,
	displayUiState: PropTypes.element,
	styleHeader: PropTypes.object,
	styleText: PropTypes.object
}

export default InputLabel