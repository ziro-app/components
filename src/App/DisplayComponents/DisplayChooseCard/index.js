import React, { useState, useMemo } from 'react'
import Header from '../../../components/Header/index'
import ChooseCard from '../../../components/ChooseCard'
import { containerWithPadding } from '@ziro/theme'

export const DisplayChooseCard = () => {

	const [selected, setSelected] = useState()

	const cards = useMemo(() => [
		{
			number: '4839 **** **** **** 4382',
			status: 'pendingApproval'
		},
		{
			number: '5049 **** **** **** 3928',
			status: 'approved'
		}
	],[])

	console.log({ selected: cards[selected] })

	return (
		<div style={containerWithPadding}>
			<Header type='title-only' title='Escolha o Cartão'/>
			<ChooseCard cards={cards} selected={selected} onClick={setSelected}/>
		</div>
	)

}