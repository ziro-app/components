import React, { useState } from 'react'
import EditableData from '../../../components/EditableData/index'
import { container } from './styles'

export const DisplayEditableData = () => {
	const [name, setName] = useState('')
	const [errorName, setErrorName] = useState('')
	const onChange = ({ target: { value } }) => {
		setName(value)
	}
	return (
		<div style={container}>
			<EditableData
				value={name}
				onChange={onChange}
				error={errorName}
				warning=''
				name='Nome'
				isValidated={false}
				hasUiState={true}
			/>
		</div>
	)
}