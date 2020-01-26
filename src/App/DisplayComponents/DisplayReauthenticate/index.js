import React from 'react'
import Reauthenticate from '../../../components/Reauthenticate/index'

export const DisplayReauthenticate = () =>
	<Reauthenticate sendToBackend={
		() => async () => await new Promise((res, rej) => setTimeout(() => res('Enviado!'), 1500))
	} />