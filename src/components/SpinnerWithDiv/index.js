import React from 'react'
import PropTypes from 'prop-types'
import Spinner from '../Spinner/index'

const SpinnerWithDiv = ({ size = '5rem' }) =>
	<div style={{ display: 'grid' }}>
		<Spinner size={size} />
	</div>

SpinnerWithDiv.propTypes = {
	size: PropTypes.string
}

export default SpinnerWithDiv