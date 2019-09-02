import React, { useState } from 'react'
import InputNotice from '../InputNotice/index'
import InputLabel from '../InputLabel/index'
import InputText from '../InputText/index'

const EditableData = () => {
	const badge = (
		<label>
			
			validado
		</label>
	)
	return (
		<div>
			<InputNotice />
			<InputLabel
				hasBadge={true}
				badge={badge}
			/>
			<InputText />
		</div>
	)
}

export default EditableData