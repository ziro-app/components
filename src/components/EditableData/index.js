import React, { useState } from 'react'
import { useMachine } from './stateMachine'
import InputNotice from '../InputNotice/index'
import InputLabel from '../InputLabel/index'
import InputText from '../InputText/index'
import BadgeValidated from '../BadgeValidated/index'
import Icon from '../Icon/index'
import Spinner from '../../Spinner/index'
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
				hasError={false}
				error={<div>Error</div>}
				hasWarning={false}
				warning={<div>Warning</div>}
			/>
			<InputLabel
				hasBadge={true}
				badge={<BadgeValidated fontSize={9} />}
				hasUiState={true}
				displayUiState={display[uiState]}
			/>
			<InputText />
		</div>
	)
}

export default EditableData