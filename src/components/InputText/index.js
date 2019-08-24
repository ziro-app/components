import React, { forwardRef } from 'react'
import { input } from './styles'

const InputText = forwardRef(({ style = input, disabled, submitting, ...rest }, ref) => {
	const inputProps = { style, disabled: disabled || submitting, ref, ...rest }
	return <input {...inputProps} />
})

export default InputText