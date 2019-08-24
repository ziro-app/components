import React, { useState } from 'react'
import InputTextType1 from '../components/InputTextType1/index'
import { container } from './styles'

export const App = () => {
	const [inputValue, setInputValue] = useState('')
	const [submitting, setSubmitting] = useState(false)
	const handleChange = ({ target: { value } }) => setInputValue(value)
	const placeholder = 'Digite aqui'
	const name = 'input'
	const inputProps = { value: inputValue, submitting, handleChange, placeholder, name }
	return (
		<div style={container}>
			<p>{inputValue}</p>
			<InputTextType1 {...inputProps} />
			<input type='submit' onClick={() => setSubmitting(!submitting)} />
		</div>
	)
}