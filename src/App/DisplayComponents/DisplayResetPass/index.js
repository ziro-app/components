import React from 'react'
import ResetPass from '../../../components/ResetPass/index'
import { containerWithPadding } from '../../../Theme/variables'

export const DisplayResetPass = () =>
	<div style={containerWithPadding}>
		<ResetPass sendToBackend={
			() => async () => await new Promise((res, rej) => setTimeout(() => res('Enviado!'), 1500))
		} />
	</div>