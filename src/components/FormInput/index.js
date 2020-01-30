import React from 'react'
import PropTypes from 'prop-types'
import InputLabel from '../InputLabel/index'
import Badge from '../Badge/index'
import { alertColor } from '@ziro/theme'
import { labelHeader, error } from './styles'

const FormInput = ({ label, errorMsg, input }) =>
	<div>
		<InputLabel
			styleHeader={labelHeader}
			name={label}
		/>
		{input}
		<label style={error}>
			&nbsp;
			{errorMsg && <Badge type='alert' message={errorMsg} size={12} color={alertColor} />}
		</label>
	</div>

FormInput.propTypes = {
	/** Propriedade que define o nome acima do input. */
	label: PropTypes.string.isRequired,
	/** Propriedade que define a mensagem de erro padrão. */
	errorMsg: PropTypes.string,
	/** Objeto de input para entrada do usuário. */
	input: PropTypes.element.isRequired
}

export default FormInput