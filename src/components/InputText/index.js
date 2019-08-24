import React from 'react'
import { input } from './styles'

const InputText = ({ style = input, disabled, submitting, ...rest }) => {
	const inputProps = { style, disabled: disabled || submitting, ...rest }
	return <input {...inputProps} />
}

export default InputText