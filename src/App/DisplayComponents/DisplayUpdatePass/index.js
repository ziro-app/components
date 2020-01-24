import React from 'react'
import UpdatePass from '../../../components/UpdatePass/index'
import { containerWithPadding } from '../../../Theme/variables'

export const DisplayUpdatePass = () =>
	<div style={containerWithPadding}>
		<UpdatePass sendToBackend={
			() => async () => await new Promise((res, rej) => setTimeout(() => res('Enviado!'), 1500))
		} />
	</div>