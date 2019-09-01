import React, { useState, useRef } from 'react'
import EditableData from '../../../components/EditableData/index'
import { container } from './styles'

export const DisplayEditableData = () => {
	return (
		<div style={container}>
			<EditableData />
		</div>
	)
}