import React, { useState, useRef } from 'react'
import InputText from '../../../components/InputText/index'
import { container, padding } from '../../../Theme/variables'

export const DisplayInputText = () => {
	const [inputValue, setInputValue] = useState('')
	const [submitting, setSubmitting] = useState(false)
	const inputRef = useRef(null)
	const onChange = ({ target: { value } }) => setInputValue(value)
	const placeholder = 'Digite aqui'
	const name = 'input'
	const inputProps = { value: inputValue, submitting, onChange, placeholder, name, ref: inputRef }
	return (
		<div style={{...container, padding: padding }}>
			<p>&nbsp;{inputValue}</p>
			<InputText {...inputProps} />
			<input type='submit' value='Disable' onClick={() => setSubmitting(!submitting)} />
		</div>
	)
}