import React, { useState, useRef } from 'react'
import InputText from '../components/InputText/index'
import { Router } from './router'
import { container } from './styles'

export const App = () => {
	const [inputValue, setInputValue] = useState('')
	const [submitting, setSubmitting] = useState(false)
	const inputRef = useRef(null)
	const onChange = ({ target: { value } }) => setInputValue(value)
	const placeholder = 'Digite aqui'
	const name = 'input'
	const inputProps = { value: inputValue, submitting, onChange, placeholder, name, ref: inputRef }
	return (
		<Router />
	)
}