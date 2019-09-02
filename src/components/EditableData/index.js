import React, { useState } from 'react'
import { useMachine } from './stateMachine'
import InputNotice from '../InputNotice/index'
import InputLabel from '../InputLabel/index'
import InputText from '../InputText/index'
import BadgeValidated from '../BadgeValidated/index'
import Icon from '../Icon/index'
import Spinner from '../../Spinner/index'
import { spinner } from './styles'

const EditableData = () => {
	const [uiState, transition] = useMachine('submitting')
	const display = {
		idle: <Icon type='pen' size={13} />,
		submitting: <Spinner size={'2rem'} style={spinner} />,
		success: <Icon type='pen' size={13} />
	}
	return (
		<div>
			<InputNotice />
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