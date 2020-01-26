import React, { useState } from 'react'
import InputEdit from '../../../components/InputEdit/index'
import { containerWithPadding } from '@ziro/theme'

export const DisplayInputEdit = () => {
	const [name, setName] = useState('Vitor Barbosa')
	const [errorName, setErrorName] = useState('')
	const onChange = ({ target: { value } }) => setName(value)
	const validateInput = () => {
		if (name.length < 3) {
			setErrorName('pelo menos 3 caracteres')
			return false
		} else {
			setErrorName('')
			return true
		}
	}
	const submit = () => new Promise((resolve, reject) => setTimeout(() => resolve('OK'),1000))
	return (
		<div style={containerWithPadding}>
			<InputEdit
				name='Nome'
				value={name}
				onChange={onChange}
				validateInput={validateInput}
				submit={submit}
				setError={setErrorName}
				error={errorName}
				warning='preencha o campo'
				placeholder='digite aqui...'
				isValidated={true}
				editable={true}
				isLoading={false}
			/>
		</div>
	)
}