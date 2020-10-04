import React from 'react'
import PropTypes from 'prop-types'
import Score from './Score'
import { container } from './styles'

const ScoreCircle = props =>
	<div style={container}>
		<Score {...props} />
	</div>

ScoreCircle.propTypes = {

}

export default ScoreCircle