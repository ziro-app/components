import React from 'react'
import FlowRegisterCard from '../../../components/FlowRegisterCard'
import { useState } from 'react'

export const DisplayFlowRegisterCard = () => {
	return (
		<FlowRegisterCard
			previous={{
				location: '/flow-choose-card'
			}}
			next={{
				onClick: (state) => () => {
					console.log({ state })
					return new Promise((res,rej) => setTimeout(() => res('ok'),1000))
				}
			}}
		/>
	)
}
	