import React, { useState } from 'react'
import { useMachine } from './stateMachine'
import InputNotice from '../InputNotice/index'
import InputLabel from '../InputLabel/index'
import InputText from '../InputText/index'
import Badge from '../Badge/index'
import Icon from '../Icon/index'
import Spinner from '../../Spinner/index'
import { successColor, alertColor, warningColor } from '../../Theme/variables'
import { submit, spinner } from './styles'

const EditableData = () => {
	const [uiState, transition] = useMachine('idle')
	const display = {
		idle: <Icon type='pen' size={13} />,
		editing: <div style={submit}>Salvar</div>,
		submitting: <Spinner size={'2rem'} style={spinner} />,
		success: <Icon type='pen' size={13} />,
		error: <div style={submit}>Salvar</div>
	}
	return (
		<div>
			<InputNotice
				uiState={uiState}
				hasError={true}
				error={<Badge
					type='alert'
					size={9}
					color={alertColor}
					strokeWidth={3}
					message='Não pode ficar em branco'
				/>}
				hasWarning={false}
				warning={<Badge
					type='success'
					size={9}
					color={warningColor}
					strokeWidth={3}
					message='preencha p/ liberar pagamentos'
				/>}
			/>
			<InputLabel
				hasBadge={true}
				badge={<Badge
					type='success'
					size={9}
					color={successColor}
					strokeWidth={3}
					message='validado'
				/>}
				hasUiState={true}
				displayUiState={display[uiState]}
			/>
			<InputText />
		</div>
	)
}

export default EditableData