import React, { useState } from 'react'
import EditableData from '../../../components/EditableData/index'
import { container } from './styles'

export const DisplayEditableData = () => {
	const [name, setName] = useState('')
	const [errorName, setErrorName] = useState('')
	const onChange = ({ target: { value } }) => setName(value)
	const validateInput = () => {
		if (name && name.length < 3) {
			setErrorName('Pelo menos 3 caracteres')
			return false
		} else {
			setErrorName('')
			return true
		}
	}
	const submit = () => new Promise((resolve, reject) => setTimeout(() => reject('NOK'),1000))
	return (
		<div style={container}>
			<EditableData
				name='Nome'
				value={name}
				onChange={onChange}
				validateInput={validateInput}
				submit={submit}
				error={errorName}
				warning='preencha o campo'
				placeholder='Digite aqui...'
				isValidated={true}
			/>
		</div>
	)
}