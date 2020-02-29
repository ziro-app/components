import React from 'react'
import FlowChooseCard from '../../../components/FlowChooseCard'
import { useState } from 'react'

export const DisplayFlowChooseCard = () => {
	return (
		<FlowChooseCard
			numbers={[
				'4839 **** 4382',
				'5449 **** 3928',
				'4839 **** 4382',
				'5449 **** 3928',
				'4839 **** 4382',
				'5449 **** 3928',
				'4839 **** 4382',
				'5449 **** 3928',
				'4839 **** 4382',
				'5449 **** 3928',
				'4839 **** 4382',
				'5449 **** 3928',
			]}
			previous={{
				location: '/flow-summary',
			}}
			next={{
				onClick: ({ number }) => () => new Promise((res,rej) => number ? res() : rej('noCard')),
				location: '/flow-choose-installment'
			}}
			newCard={{
				location: '/flow-register-card'
			}}
			onError={(error) => console.log({ error })}
		/>
	)
}
	