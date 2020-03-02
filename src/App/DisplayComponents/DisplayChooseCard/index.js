import React, { useState, useMemo } from 'react'
import Header from '../../../components/Header/index'
import ChooseCard from '../../../components/ChooseCard'
import { containerWithPadding } from '@ziro/theme'

export const DisplayChooseCard = () => {

	const [selected, setSelected] = useState()

	const numbers = useMemo(() => ([
		'4839 **** **** **** 4382',
		'5049 **** **** **** 3928',
		'9382 **** **** **** 4930',
		'9403 **** **** **** 3928'
	]),[])

	console.log({ selected: numbers[selected] })

	return (
		<div style={containerWithPadding}>
			<Header type='title-only' title='Escolha o Cartão'/>
			<ChooseCard
				numbers={numbers}
				selected={selected}
				setSelected={setSelected}
			/>
		</div>
	)

}