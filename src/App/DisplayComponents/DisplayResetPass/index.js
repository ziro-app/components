import React from 'react'
import ResetPass from '../../../components/ResetPass/index'

export const DisplayResetPass = () =>
	<ResetPass sendToBackend={
		() => async () => await new Promise((res, rej) => setTimeout(() => res('Enviado!'), 1500))
	} />