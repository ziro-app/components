import React, { useState } from 'react'
import EditableData from '../../../components/EditableData/index'
import { container } from './styles'

export const DisplayEditableData = () => {
	const [name, setName] = useState('')
	const [errorName, setErrorName] = useState('')
	const onChange = ({ target: { value } }) => {
		setName(value)
	}
	const submit = () => console.log('submit')
	return (
		<div style={container}>
			<EditableData
				name='Nome'
				value={name}
				onChange={onChange}
				error={errorName}
				placeholder='Digite aqui...'
				warning='Danger'
				isValidated={true}
			/>
		</div>
	)
}