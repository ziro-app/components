import React from 'react'
import DeleteAccount from '../../../components/DeleteAccount/index'

export const DisplayDeleteAccount = () =>
	<DeleteAccount click={
		async () => await new Promise((res, rej) => setTimeout(() => res(console.log('Excluído!')), 500))
	} />