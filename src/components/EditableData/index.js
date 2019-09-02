import React, { useState, useRef } from 'react'
import { useMachine } from './stateMachine'
import InputNotice from '../InputNotice/index'
import InputLabel from '../InputLabel/index'
import InputText from '../InputText/index'
import Badge from '../Badge/index'
import Icon from '../Icon/index'
import Spinner from '../../Spinner/index'
import { successColor, alertColor, warningColor } from '../../Theme/variables'
import { submit, spinner, inputInline, inputStylesheet } from './styles'

const EditableData = () => {
	const [uiState, transition] = useMachine('idle')
	const input = useRef(null)
	const selectInput = () => input && input.current ? input.current.select() : null
	const display = {
		idle: <Icon type='pen' size={13} />,
		editing: <div style={submit}>Salvar</div>,
		submitting: <Spinner size={'2rem'} style={spinner} />,
		success: <Icon type='pen' size={13} />,
		error: <div style={submit}>Salvar</div>
	}
	return (
		<div onClick={selectInput}>
			<InputNotice
				uiState={uiState}
				hasError={false}
				error={<Badge
					type='alert'
					size={9}
					color={alertColor}
					strokeWidth={3}
					message='Não pode ficar em branco'
				/>}
				hasWarning={false}
				warning={<Badge
					type='warning'
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
			<InputText
				style={inputInline}
				css={inputStylesheet}
				ref={input}
			/>
		</div>
	)
}

export default EditableData