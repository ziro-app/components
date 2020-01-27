import React from 'react'
import DeleteAccount from '../../../components/DeleteAccount/index'

export const DisplayDeleteAccount = () =>
	<DeleteAccount sendToBackend={
		() => async () => await new Promise((res, rej) => setTimeout(() => res('Excluído!'), 1500))
	} />