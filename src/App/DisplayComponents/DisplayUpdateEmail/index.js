import React from 'react'
import UpdateEmail from '../../../components/UpdateEmail/index'

export const DisplayUpdateEmail = () =>
	<UpdateEmail sendToBackend={
		() => async () => await new Promise((res, rej) => setTimeout(() => res('Enviado!'), 1500))
	} />