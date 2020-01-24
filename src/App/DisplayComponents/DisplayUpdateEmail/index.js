import React from 'react'
import UpdateEmail from '../../../components/UpdateEmail/index'
import { containerWithPadding } from '../../../Theme/variables'

export const DisplayUpdateEmail = () =>
	<div style={containerWithPadding}>
		<UpdateEmail sendToBackend={
			() => async () => await new Promise((res, rej) => setTimeout(() => res('Enviado!'), 1500))
		} />
	</div>