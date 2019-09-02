import React, { useState } from 'react'
import { useMachine } from './stateMachine'
import InputNotice from '../InputNotice/index'
import InputLabel from '../InputLabel/index'
import InputText from '../InputText/index'
import BadgeValidated from '../BadgeValidated/index'
import Icon from '../Icon/index'

const EditableData = () => {
	const [uiState, transition] = useMachine('idle')
	const display = {
		idle: <Icon type='pen' size={13} />,
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