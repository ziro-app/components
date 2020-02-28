import React from 'react'
import FlowRegisterCard from '../../../components/FlowRegisterCard'
import { useState } from 'react'

export const DisplayFlowRegisterCard = () => {
	return (
		<FlowRegisterCard
			previous={{
				location: '/flow-choose-card'
			}}
			sendToBackend={(state) => {
				console.log({ state })
				return () => new Promise((res,rej) => setTimeout(() => rej('ok'),1000))
			}}
		/>
	)
}
	