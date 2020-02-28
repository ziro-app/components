import React from 'react'
import FlowChooseCard from '../../../components/FlowChooseCard'
import { useState } from 'react'

export const DisplayFlowChooseCard = () => {
	const [selected, setSelected] = useState(null)
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
			onChange={setSelected}
			previous={{
				location: '/flow-summary',
			}}
			next={{
				onClick: () => new Promise((res,rej) => selected ? res() : rej('noCard')),
				location: '/flow-choose-installment'
			}}
			newCard={{
				location: '/flow-register-card'
			}}
			onError={(error) => console.log({ error })}
		/>
	)
}
	