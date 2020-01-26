import React from 'react'
import UpdatePass from '../../../components/UpdatePass/index'

export const DisplayUpdatePass = () =>
	<UpdatePass sendToBackend={
		() => async () => await new Promise((res, rej) => setTimeout(() => res('Enviado!'), 1500))
	} />