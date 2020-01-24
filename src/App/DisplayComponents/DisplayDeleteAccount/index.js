import React from 'react'
import DeleteAccount from '../../../components/DeleteAccount/index'
import { containerWithPadding } from '../../../Theme/variables'

export const DisplayDeleteAccount = () =>
	<div style={containerWithPadding}>
		<DeleteAccount click={
			async () => await new Promise((res, rej) => setTimeout(() => res(console.log('Excluído!')), 500))
		} />
	</div>