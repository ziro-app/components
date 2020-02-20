import React from 'react'
import Header from '../../../components/Header/index'
import ChooseCard from '../../../components/ChooseCard'
import { containerWithPadding } from '@ziro/theme'

export const DisplayChooseCard = () =>
	<div style={containerWithPadding}>
		<Header type='title-only' title='Escolha o Cartão' />
		<ChooseCard
			numbers={[
				'4839 **** **** **** 4382',
				'5049 **** **** **** 3928',
				'9382 **** **** **** 4930',
				'9403 **** **** **** 3928'
			]}
			onChange={(number) => console.log({ number })}
		/>
	</div>