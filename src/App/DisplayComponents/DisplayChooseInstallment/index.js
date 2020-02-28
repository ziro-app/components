import React from 'react'
import Header from '../../../components/Header/index'
import ChooseInstallment from '../../../components/ChooseInstallment'
import { containerWithPadding } from '@ziro/theme'

export const DisplayChooseInstallment = () =>
	<div style={containerWithPadding}>
		<Header type='title-only' title='Pagamento' />
		<ChooseInstallment
            seller='Crisfael'
            charge='60078'
            maxInstallments='6'
            cardNumber='4839 **** **** **** 4382'
            onChange={(installments) => console.log({ installments })}
        />
	</div>