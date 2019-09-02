import React, { useState } from 'react'
import EditableData from '../../../components/EditableData/index'
import { container } from './styles'

export const DisplayEditableData = () => {
	const [name, setName] = useState('')
	const [errorName, setErrorName] = useState('')
	const onChange = ({ target: { value } }) => {
		setName(value)
	}
	const submit = () => {
		console.log('submit')
		return new Promise(resolve => setTimeout(() => resolve('OK'),1000))
	}
	return (
		<div style={container}>
			<EditableData
				name='Nome'
				value={name}
				onChange={onChange}
				submit={submit}
				error={errorName}
				warning='preencha o campo'
				placeholder='Digite aqui...'
				isValidated={true}
			/>
		</div>
	)
}