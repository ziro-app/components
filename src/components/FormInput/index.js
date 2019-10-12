import React from 'react'
import PropTypes from 'prop-types'
import InputLabel from '../InputLabel/index'
import Badge from '../Badge/index'
import { alertColor } from '../../Theme/variables'
import { labelHeader, error } from './styles'

const FormInput = ({ name, errorMsg, input }) =>
	<div>
		<InputLabel
			styleHeader={labelHeader}
			name={name}
		/>
		{input}
		<label style={error}>
			&nbsp;
			{errorMsg && <Badge type='alert' message={errorMsg} size={12} color={alertColor} />}
		</label>
	</div>

FormInput.propTypes = {
	name: PropTypes.string.isRequired,
	errorMsg: PropTypes.string,
	input: PropTypes.element.isRequired
}

export default FormInput