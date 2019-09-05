import React from 'react'
import PropTypes from 'prop-types'

const InputNotice = ({ uiState, hasError, error, hasWarning, warning }) => {
	if (uiState === 'submitting')
		return <div style={{ height: '1.6rem'}}>&nbsp;</div>
	else {
		if (hasError) return error
		if (!hasError && hasWarning) return warning
		return <div style={{ height: '1.6rem'}}>&nbsp;</div>
	}
}

InputNotice.propTypes = {
	uiState: PropTypes.string.isRequired,
	hasError: PropTypes.bool.isRequired,
	error: PropTypes.element.isRequired,
	hasWarning: PropTypes.bool.isRequired,
	warning: PropTypes.element.isRequired
}

export default InputNotice