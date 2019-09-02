import React, { useState } from 'react'
import InputNotice from '../InputNotice/index'
import InputLabel from '../InputLabel/index'
import InputText from '../InputText/index'
import BadgeValidated from '../BadgeValidated/index'

const EditableData = () => {
	const display = {
		idle: <PenIcon size={13} />,
		editing: <div style={submit} onClick={saveFname}>Salvar</div>,
		submitting: <Spinner size={'2rem'} style={spinner} />,
		success: <PenIcon size={13} />,
		error: <div style={submit} onClick={saveFname}>Salvar</div>
	}
	return (
		<div>
			<InputNotice />
			<InputLabel
				hasBadge={true}
				badge={<BadgeValidated fontSize={9} />}
				hasUiState={true}
				displayUiState={display['editing']}
			/>
			<InputText />
		</div>
	)
}

export default EditableData