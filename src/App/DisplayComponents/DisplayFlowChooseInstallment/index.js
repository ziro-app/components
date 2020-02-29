import React from 'react'
import FlowChooseInstallment from '../../../components/FlowChooseInstallment'
import { useState } from 'react'

export const DisplayFlowChooseInstallment = () => {
	return (
		<FlowChooseInstallment
			seller='Crisfael'
			charge='60078'
			maxInstallments='6'
			cardNumber='4839 **** 4382'
			previous={{
				location: '/flow-choose-card'
			}}
			next={{
				onClick: ({ installments }) => () => new Promise((res,rej) => installments ? res() : rej('noInstallments'))
			}}
			onError={(error) => console.log({ error })}
		/>
	)
}
	