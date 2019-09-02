import React from 'react'
import PropTypes from 'prop-types'
import { header, name } from './styles'


const InputLabel = ({ hasNote, note }) =>
	<div style={header(hasNote)}>
		<label style={name}>Nome</label>
		{hasNote && note}
		{display[uiState]}
	</div>

InputLabel.propTypes = {
	hasNote: PropTypes.bool.isRequired,
	note: PropTypes.element.isRequired
}

export default InputLabel