import React, { useState } from 'react'
import InputText from '../components/InputText/index'
import { container } from './styles'

export const App = () => {
	const [inputValue, setInputValue] = useState('')
	const [submitting, setSubmitting] = useState(false)
	const onChange = ({ target: { value } }) => setInputValue(value)
	const placeholder = 'Digite aqui'
	const name = 'input'
	const inputProps = { value: inputValue, submitting, onChange, placeholder, name }
	return (
		<div style={container}>
			<p>{inputValue}</p>
			<InputText {...inputProps} />
			<input type='submit' onClick={() => setSubmitting(!submitting)} />
		</div>
	)
}