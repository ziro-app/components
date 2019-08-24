import React from 'react'
import { input } from './styles'

const InputText = ({ styles, name, submitting, ...rest }) => {
	const style = styles ? styles : input
	const inputProps = { style, id: name, disabled: submitting, ...rest }
	return <input {...inputProps} />
}

export default InputText