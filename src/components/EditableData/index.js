import React, { useState } from 'react'
import InputNotice from '../InputNotice/index'
import InputLabel from '../InputLabel/index'
import InputText from '../InputText/index'
import BadgeValidated from '../BadgeValidated/index'

const EditableData = () => {
	return (
		<div>
			<InputNotice />
			<InputLabel
				hasBadge={true}
				badge={<BadgeValidated fontSize={8} />}
			/>
			<InputText />
		</div>
	)
}

export default EditableData