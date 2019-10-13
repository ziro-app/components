import React, { useState, useRef } from 'react'
import InputText from '../../../components/InputText/index'
import Button from '../../../components/Button/index'
import { containerWithPadding } from '../../../Theme/variables'

export const DisplayInputText = () => {
	const [inputValue, setInputValue] = useState('')
	const [submitting, setSubmitting] = useState(false)
	const inputRef = useRef(null)
	const onChange = ({ target: { value } }) => setInputValue(value)
	const placeholder = 'Digite aqui'
	const name = 'input'
	const inputProps = { value: inputValue, submitting, onChange, placeholder, name, ref: inputRef }
	return (
		<div style={containerWithPadding}>
			<p>&nbsp;{inputValue}</p>
			<InputText {...inputProps} />
			<div style={{ display: 'grid', marginTop: '40px' }} onClick={() => setSubmitting(!submitting)}><Button type='submit' cta='Disable input' /></div>
		</div>
	)
}