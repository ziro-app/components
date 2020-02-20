import React from 'react'
import Header from '../../../components/Header/index'
import FlowChooseCard from '../../../components/FlowChooseCard'
import { containerWithPadding } from '@ziro/theme'
import { useLocation } from 'wouter'

export const DisplayFlowChooseCard = () => {
	const [,setLocation] = useLocation()
	return (
		<FlowChooseCard
			numbers={[
				'4839 **** **** **** 4382',
				'5449 **** **** **** 3928',
				'9382 **** **** **** 4930',
				'9403 **** **** **** 3928',
				'4839 **** **** **** 4382',
				'5449 **** **** **** 3928',
				'9382 **** **** **** 4930',
				'9403 **** **** **** 3928'
			]}
			onChange={(number) => console.log({ number })}
			onNewCard={() => setLocation('/register-card')}
			onNext={() => {}}
			onPrevious={() => setLocation('/flow-summary')}
		/>
	)
}
	