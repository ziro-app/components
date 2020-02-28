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
			onChange={(installment) => console.log({ installment })}
			previous={{
				location: '/flow-choose-card'
			}}
		/>
	)
}
	