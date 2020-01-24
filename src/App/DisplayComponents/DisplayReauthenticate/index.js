import React from 'react'
import Reauthenticate from '../../../components/Reauthenticate/index'
import { containerWithPadding } from '../../../Theme/variables'

export const DisplayReauthenticate = () =>
	<div style={containerWithPadding}>
		<Reauthenticate sendToBackend={
			() => async () => await new Promise((res, rej) => setTimeout(() => res('Enviado!'), 1500))
		} />
	</div>